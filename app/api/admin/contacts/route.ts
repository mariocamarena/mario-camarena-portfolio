import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'

// Admin endpoint for contact submissions
export async function GET(request: NextRequest) {
  try {
    // Simple password verification
    const authHeader = request.headers.get('authorization')
    const password = process.env.ADMIN_PASSWORD || 'admin123'
    
    if (!authHeader || authHeader !== `Bearer ${password}`) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      )
    }

          // Fetch submissions by date
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

    // Get some basic stats too
    const statsResult = await pool.query(`
      SELECT 
        COUNT(*) as total_submissions,
        COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as this_week,
        COUNT(CASE WHEN created_at >= NOW() - INTERVAL '1 day' THEN 1 END) as today
      FROM contacts
    `)

    return NextResponse.json({
      success: true,
      contacts: result.rows,
      stats: statsResult.rows[0]
    })

  } catch (error) {
    console.error('Admin contacts fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
} 