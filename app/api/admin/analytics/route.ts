import { NextRequest, NextResponse } from 'next/server'
import { pool, isDatabaseConfigured } from '@/lib/db'

export async function GET(request: NextRequest) {
  // Auth check
  const authHeader = request.headers.get('authorization')
  const password = process.env.ADMIN_PASSWORD || 'admin123'

  if (!authHeader || authHeader !== `Bearer ${password}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isDatabaseConfigured || !pool) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    // Overview stats
    const overviewStats = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM page_views) as total_page_views,
        (SELECT COUNT(*) FROM page_views WHERE created_at >= NOW() - INTERVAL '24 hours') as views_today,
        (SELECT COUNT(*) FROM page_views WHERE created_at >= NOW() - INTERVAL '7 days') as views_this_week,
        (SELECT COUNT(*) FROM visitors) as unique_visitors,
        (SELECT COUNT(*) FROM visitors WHERE last_visit >= NOW() - INTERVAL '24 hours') as visitors_today
    `)

    // Page views by page
    const pageStats = await pool.query(`
      SELECT page_path, COUNT(*) as views
      FROM page_views
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY page_path
      ORDER BY views DESC
      LIMIT 10
    `)

    // Device breakdown
    const deviceStats = await pool.query(`
      SELECT device_type, COUNT(*) as count
      FROM page_views
      WHERE created_at >= NOW() - INTERVAL '30 days' AND device_type IS NOT NULL
      GROUP BY device_type
      ORDER BY count DESC
    `)

    // Browser breakdown
    const browserStats = await pool.query(`
      SELECT browser, COUNT(*) as count
      FROM page_views
      WHERE created_at >= NOW() - INTERVAL '30 days' AND browser IS NOT NULL
      GROUP BY browser
      ORDER BY count DESC
      LIMIT 5
    `)

    // Country breakdown
    const countryStats = await pool.query(`
      SELECT country, COUNT(*) as count
      FROM page_views
      WHERE created_at >= NOW() - INTERVAL '30 days' AND country IS NOT NULL
      GROUP BY country
      ORDER BY count DESC
      LIMIT 10
    `)

    // Recent visitors with details
    const recentVisitors = await pool.query(`
      SELECT
        visitor_id,
        ip_address,
        country,
        city,
        device_type,
        browser,
        os,
        first_visit,
        last_visit,
        visit_count
      FROM visitors
      ORDER BY last_visit DESC
      LIMIT 20
    `)

    // Views over time (last 7 days)
    const viewsOverTime = await pool.query(`
      SELECT
        DATE(created_at) as date,
        COUNT(*) as views
      FROM page_views
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `)

    // Recent page views with full details
    const recentPageViews = await pool.query(`
      SELECT
        id,
        page_path,
        ip_address,
        country,
        city,
        device_type,
        browser,
        os,
        referrer,
        created_at
      FROM page_views
      ORDER BY created_at DESC
      LIMIT 50
    `)

    return NextResponse.json({
      success: true,
      overview: overviewStats.rows[0],
      pageStats: pageStats.rows,
      deviceStats: deviceStats.rows,
      browserStats: browserStats.rows,
      countryStats: countryStats.rows,
      recentVisitors: recentVisitors.rows,
      viewsOverTime: viewsOverTime.rows,
      recentPageViews: recentPageViews.rows,
    })
  } catch (error) {
    console.error('Analytics fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
