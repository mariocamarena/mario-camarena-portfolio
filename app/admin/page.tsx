"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Calendar, Globe, User, ArrowLeft } from 'lucide-react'

const theme = {
  bg: "#0a0a0f",
  surface: "#1a1a2e",
  elevated: "#16213e",
  primary: "#00d4ff",
  secondary: "#7c3aed",
  success: "#00ff88",
  text: "#ffffff",
  textSoft: "#b4bcd0",
  textMuted: "#6b7280",
  border: "#2d3748",
  accent: "#ff6b35",
  error: "#ef4444",
}

interface Contact {
  id: number
  name: string
  email: string
  message: string
  created_at: string
  user_agent: string
  ip_address: string
}

interface Stats {
  total_submissions: string
  this_week: string
  today: string
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [contacts, setContacts] = useState<Contact[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  // Check if already authenticated (simple localStorage check)
  useEffect(() => {
    const authToken = localStorage.getItem('admin_auth')
    if (authToken) {
      setIsAuthenticated(true)
      fetchContacts(authToken)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/contacts', {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setIsAuthenticated(true)
        setContacts(data.contacts)
        setStats(data.stats)
        localStorage.setItem('admin_auth', password)
      } else {
        setError('Invalid password')
      }
    } catch (error) {
      setError('Something went wrong')
    }

    setLoading(false)
  }

  const fetchContacts = async (authToken: string) => {
    try {
      const response = await fetch('/api/admin/contacts', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setContacts(data.contacts)
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
    setContacts([])
    setStats(null)
    setPassword('')
    // Take us back to the main portfolio site
    window.location.href = '/'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Preview data when not authenticated
  const mockStats = {
    total_submissions: '--',
    this_week: '-',
    today: '-'
  }

  const mockContacts = [
    { id: 1, name: '[Protected]', email: '[Protected]', message: '[Contact details hidden until authentication]', created_at: '2024-01-01T00:00:00.000Z', user_agent: '[Protected]', ip_address: '[Protected]' },
    { id: 2, name: '[Protected]', email: '[Protected]', message: '[Contact details hidden until authentication]', created_at: '2024-01-01T00:00:00.000Z', user_agent: '[Protected]', ip_address: '[Protected]' },
    { id: 3, name: '[Protected]', email: '[Protected]', message: '[Contact details hidden until authentication]', created_at: '2024-01-01T00:00:00.000Z', user_agent: '[Protected]', ip_address: '[Protected]' },
  ]

  const displayStats = isAuthenticated ? stats : mockStats
  const displayContacts = isAuthenticated ? contacts : mockContacts

  return (
    <div 
      className="min-h-screen relative"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Blurred dashboard background */}
      <div 
        className={`max-w-7xl mx-auto px-4 py-8 transition-all duration-500 ${
          !isAuthenticated ? 'filter blur-sm opacity-50 pointer-events-none select-none' : ''
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 
            className="text-3xl font-bold"
            style={{ color: theme.text }}
          >
            Contact Submissions
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg border transition-colors"
            style={{ 
              borderColor: theme.border,
              color: theme.textSoft
            }}
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        {displayStats && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Total Submissions', value: displayStats.total_submissions, icon: Mail },
              { label: 'This Week', value: displayStats.this_week, icon: Calendar },
              { label: 'Today', value: displayStats.today, icon: Globe }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border"
                style={{ 
                  backgroundColor: theme.surface,
                  borderColor: theme.border 
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ color: theme.textMuted }}>{stat.label}</p>
                    <p 
                      className="text-2xl font-bold"
                      style={{ color: theme.text }}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon 
                    size={24} 
                    style={{ color: theme.primary }} 
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Contacts Table */}
        <div 
          className="rounded-xl border overflow-hidden"
          style={{ 
            backgroundColor: theme.surface,
            borderColor: theme.border 
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: theme.elevated }}>
                  <th className="px-6 py-4 text-left" style={{ color: theme.text }}>Name</th>
                  <th className="px-6 py-4 text-left" style={{ color: theme.text }}>Email</th>
                  <th className="px-6 py-4 text-left" style={{ color: theme.text }}>Date</th>
                  <th className="px-6 py-4 text-left" style={{ color: theme.text }}>Message</th>
                  <th className="px-6 py-4 text-left" style={{ color: theme.text }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayContacts.map((contact, index) => (
                  <motion.tr
                    key={contact.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t"
                    style={{ borderColor: theme.border }}
                  >
                    <td className="px-6 py-4" style={{ color: theme.text }}>
                      <div className="flex items-center">
                        <User size={16} className="mr-2" style={{ color: theme.primary }} />
                        {contact.name}
                      </div>
                    </td>
                    <td className="px-6 py-4" style={{ color: theme.textSoft }}>
                      {contact.email}
                    </td>
                    <td className="px-6 py-4" style={{ color: theme.textMuted }}>
                      {formatDate(contact.created_at)}
                    </td>
                    <td className="px-6 py-4" style={{ color: theme.textSoft }}>
                      <div className="max-w-xs truncate">
                        {contact.message}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => isAuthenticated && setSelectedContact(contact)}
                        disabled={!isAuthenticated}
                        className="px-3 py-1 rounded text-sm transition-colors"
                        style={{ 
                          backgroundColor: theme.primary + '20',
                          color: theme.primary,
                          opacity: isAuthenticated ? 1 : 0.5
                        }}
                      >
                        View
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {displayContacts.length === 0 && isAuthenticated && (
          <div className="text-center py-12">
            <p style={{ color: theme.textMuted }}>No submissions yet</p>
          </div>
        )}
      </div>

      {/* Login modal overlay when not authenticated */}
      {!isAuthenticated && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center px-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="w-full max-w-md"
          >
            <div 
              className="p-8 rounded-2xl shadow-2xl border backdrop-blur-md"
              style={{ 
                backgroundColor: theme.surface + 'F0',
                borderColor: theme.border 
              }}
            >
              {/* Back to main site button */}
              <motion.button
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 text-sm mb-6 transition-colors"
                style={{ color: theme.textMuted }}
                whileHover={{ 
                  color: theme.primary,
                  x: -3
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <ArrowLeft size={16} />
                Back to Portfolio
              </motion.button>

              <motion.h1 
                className="text-2xl font-bold text-center mb-2"
                style={{ color: theme.text }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Admin Dashboard
              </motion.h1>
              
              <motion.p 
                className="text-center mb-8 text-sm"
                style={{ color: theme.textMuted }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Password protected - just making sure it's me
              </motion.p>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 bg-transparent focus:outline-none transition-all duration-200"
                    style={{
                      borderColor: theme.border,
                      color: theme.text
                    }}
                    placeholder="Enter admin password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
                    style={{ color: theme.textMuted }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </motion.div>

                {error && (
                  <motion.p 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-sm text-center p-3 rounded-lg"
                    style={{ 
                      color: theme.error,
                      backgroundColor: theme.error + '20',
                      border: `1px solid ${theme.error}40`
                    }}
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg font-medium transition-all duration-200 relative overflow-hidden"
                  style={{
                    backgroundColor: theme.primary,
                    color: theme.bg
                  }}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Logging in...
                    </div>
                  ) : (
                    'Access Dashboard'
                  )}
                </motion.button>
              </form>
              
              <motion.div 
                className="mt-6 text-center text-xs"
                style={{ color: theme.textMuted }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Built this dashboard to keep track of messages
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Modal for viewing full contact */}
      {selectedContact && isAuthenticated && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedContact(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-2xl w-full p-6 rounded-xl border"
            style={{ 
              backgroundColor: theme.surface,
              borderColor: theme.border 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 
              className="text-xl font-bold mb-4"
              style={{ color: theme.text }}
            >
              Message from {selectedContact.name}
            </h3>
            
            <div className="space-y-4">
              <div>
                <p style={{ color: theme.textMuted }}>Email:</p>
                <p style={{ color: theme.text }}>{selectedContact.email}</p>
              </div>
              
              <div>
                <p style={{ color: theme.textMuted }}>Date:</p>
                <p style={{ color: theme.text }}>{formatDate(selectedContact.created_at)}</p>
              </div>
              
              <div>
                <p style={{ color: theme.textMuted }}>Message:</p>
                <p 
                  className="p-3 rounded border whitespace-pre-wrap"
                  style={{ 
                    backgroundColor: theme.elevated,
                    borderColor: theme.border,
                    color: theme.text 
                  }}
                >
                  {selectedContact.message}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p style={{ color: theme.textMuted }}>IP Address:</p>
                  <p style={{ color: theme.textSoft }}>{selectedContact.ip_address}</p>
                </div>
                <div>
                  <p style={{ color: theme.textMuted }}>User Agent:</p>
                  <p 
                    className="truncate"
                    style={{ color: theme.textSoft }}
                  >
                    {selectedContact.user_agent}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedContact(null)}
              className="mt-6 px-4 py-2 rounded transition-colors"
              style={{ 
                backgroundColor: theme.primary,
                color: theme.bg 
              }}
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
} 