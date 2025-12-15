import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'

// Contact form submission handler
export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Client info for analytics
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ipAddress = forwarded?.split(',')[0] || realIp || 'Unknown'

    // Database insertion
    const result = await pool.query(
      `INSERT INTO contacts (name, email, message, user_agent, ip_address)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, created_at`,
      [name, email, message, userAgent, ipAddress]
    )

    console.log(`New contact submission from ${name} (${email}) - ID: ${result.rows[0].id}`)

    return NextResponse.json({
      success: true,
      message: 'Thanks for reaching out! I\'ll get back to you soon.',
      id: result.rows[0].id
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
} 