import { Pool } from 'pg'
import fs from 'fs'
import path from 'path'

// Check if database is configured
export const isDatabaseConfigured = !!process.env.DATABASE_URL

// PostgreSQL connection pool (only create if configured)
const pool = isDatabaseConfigured ? new Pool({
  connectionString: process.env.DATABASE_URL,
  // SSL configuration for production vs local
  ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false },
  // Connection pool settings
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}) : null

// Database connection test
export async function testConnection() {
  if (!pool) {
    console.log('Database not configured - using file storage fallback')
    return false
  }
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT NOW()')
    client.release()
    console.log('Database connected successfully:', result.rows[0])
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}

// ============================================
// File-based storage fallback (when no DB)
// ============================================

const CONTACTS_FILE = path.join(process.cwd(), 'data', 'contacts.json')

interface Contact {
  id: number
  name: string
  email: string
  message: string
  created_at: string
  user_agent: string
  ip_address: string
}

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read contacts from file
export function getContactsFromFile(): Contact[] {
  ensureDataDir()
  if (!fs.existsSync(CONTACTS_FILE)) {
    return []
  }
  try {
    const data = fs.readFileSync(CONTACTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Save contact to file
export function saveContactToFile(contact: Omit<Contact, 'id' | 'created_at'>): Contact {
  ensureDataDir()
  const contacts = getContactsFromFile()
  const newContact: Contact = {
    ...contact,
    id: contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1,
    created_at: new Date().toISOString(),
  }
  contacts.unshift(newContact) // Add to beginning
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2))
  return newContact
}

// Get file-based stats
export function getFileStats() {
  const contacts = getContactsFromFile()
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  return {
    total_submissions: String(contacts.length),
    this_week: String(contacts.filter(c => new Date(c.created_at) >= weekAgo).length),
    today: String(contacts.filter(c => new Date(c.created_at) >= dayAgo).length),
  }
}

export { pool } 