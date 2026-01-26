import { NextRequest, NextResponse } from 'next/server'
import { pool, isDatabaseConfigured } from '@/lib/db'

// Parse user agent to extract device info
function parseUserAgent(ua: string) {
  const device = /Mobile|Android|iPhone|iPad/i.test(ua) ? 'mobile' :
                 /Tablet/i.test(ua) ? 'tablet' : 'desktop'

  let browser = 'Unknown'
  if (ua.includes('Firefox')) browser = 'Firefox'
  else if (ua.includes('Edg')) browser = 'Edge'
  else if (ua.includes('Chrome')) browser = 'Chrome'
  else if (ua.includes('Safari')) browser = 'Safari'
  else if (ua.includes('Opera')) browser = 'Opera'

  let os = 'Unknown'
  if (ua.includes('Windows')) os = 'Windows'
  else if (ua.includes('Mac OS')) os = 'macOS'
  else if (ua.includes('Linux')) os = 'Linux'
  else if (ua.includes('Android')) os = 'Android'
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS'

  return { device, browser, os }
}

export async function POST(request: NextRequest) {
  if (!isDatabaseConfigured || !pool) {
    return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const { page_path, referrer, screen_width, screen_height, language, visitor_id } = body

    // Get client info
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ipAddress = forwarded?.split(',')[0]?.trim() || realIp || 'Unknown'

    // Parse user agent
    const { device, browser, os } = parseUserAgent(userAgent)

    // Get geo info from IP (using free ipapi.co service - supports HTTPS)
    let country = null
    let city = null
    try {
      if (ipAddress && ipAddress !== 'Unknown' && ipAddress !== '::1' && ipAddress !== '127.0.0.1') {
        const geoResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`, {
          signal: AbortSignal.timeout(2000) // 2 second timeout
        })
        if (geoResponse.ok) {
          const geoData = await geoResponse.json()
          country = geoData.country_name || null
          city = geoData.city || null
        }
      }
    } catch {
      // Ignore geo lookup failures
    }

    // Insert page view
    await pool.query(
      `INSERT INTO page_views (page_path, referrer, user_agent, ip_address, country, city, device_type, browser, os, screen_width, screen_height, language)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [page_path, referrer, userAgent, ipAddress, country, city, device, browser, os, screen_width, screen_height, language]
    )

    // Update or insert visitor
    if (visitor_id) {
      await pool.query(
        `INSERT INTO visitors (visitor_id, ip_address, country, city, user_agent, device_type, browser, os)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (visitor_id) DO UPDATE SET
           last_visit = NOW(),
           visit_count = visitors.visit_count + 1,
           ip_address = EXCLUDED.ip_address,
           country = COALESCE(EXCLUDED.country, visitors.country),
           city = COALESCE(EXCLUDED.city, visitors.city)`,
        [visitor_id, ipAddress, country, city, userAgent, device, browser, os]
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
