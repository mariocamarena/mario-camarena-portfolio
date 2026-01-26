import { NextRequest, NextResponse } from 'next/server'
import { pool, isDatabaseConfigured, getContactsFromFile, getFileStats } from '@/lib/db'

// Admin endpoint for contact submissions
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Simple password verification (runtime only)
    const authHeader = request.headers.get('authorization')
    const password = process.env.ADMIN_PASSWORD

    if (!password) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    if (!authHeader || authHeader !== `Bearer ${password}`) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      )
    }

    let contacts
    let stats

    if (isDatabaseConfigured && pool) {
      // Fetch from database
      const result = await pool.query(`
        SELECT
          id,
          name,
          email,
          message,
          created_at,
          user_agent,
          ip_address
        FROM contacts
        ORDER BY created_at DESC
      `)

      const statsResult = await pool.query(`
        SELECT
          COUNT(*) as total_submissions,
          COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as this_week,
          COUNT(CASE WHEN created_at >= NOW() - INTERVAL '1 day' THEN 1 END) as today
        FROM contacts
      `)

      contacts = result.rows
      stats = statsResult.rows[0]
    } else {
      // File-based fallback
      contacts = getContactsFromFile()
      stats = getFileStats()
    }

    return NextResponse.json({
      success: true,
      contacts,
      stats
    })

  } catch (error) {
    console.error('Admin contacts fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
} 