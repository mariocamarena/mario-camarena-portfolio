"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Eye, EyeOff, Mail, Calendar, Globe, User, ArrowLeft,
  BarChart3, Users, Monitor, Smartphone, Tablet, MapPin,
  Clock, TrendingUp, Chrome, Layout
} from 'lucide-react'

const theme = {
  bg: "#0a0a0a",
  surface: "#111111",
  elevated: "#1a1a1a",
  accent: "#f5f5f5",
  text: "#f5f5f5",
  textSoft: "#a0a0a0",
  textMuted: "#666666",
  border: "#2a2a2a",
  error: "#888888",
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

interface Analytics {
  overview: {
    total_page_views: string
    views_today: string
    views_this_week: string
    unique_visitors: string
    visitors_today: string
  }
  pageStats: { page_path: string; views: string }[]
  deviceStats: { device_type: string; count: string }[]
  browserStats: { browser: string; count: string }[]
  countryStats: { country: string; count: string }[]
  recentVisitors: {
    visitor_id: string
    ip_address: string
    country: string
    city: string
    device_type: string
    browser: string
    os: string
    first_visit: string
    last_visit: string
    visit_count: number
  }[]
  viewsOverTime: { date: string; views: string }[]
  recentPageViews: {
    id: number
    page_path: string
    ip_address: string
    country: string
    city: string
    device_type: string
    browser: string
    os: string
    referrer: string
    created_at: string
  }[]
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [contacts, setContacts] = useState<Contact[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [activeTab, setActiveTab] = useState<'contacts' | 'analytics'>('analytics')

  useEffect(() => {
    const authToken = localStorage.getItem('admin_auth')
    if (authToken) {
      setIsAuthenticated(true)
      fetchData(authToken)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/contacts', {
        headers: { 'Authorization': `Bearer ${password}` }
      })

      if (response.ok) {
        setIsAuthenticated(true)
        localStorage.setItem('admin_auth', password)
        fetchData(password)
      } else {
        setError('Invalid password')
      }
    } catch {
      setError('Something went wrong')
    }
    setLoading(false)
  }

  const fetchData = async (authToken: string) => {
    try {
      // Fetch contacts
      const contactsRes = await fetch('/api/admin/contacts', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
      if (contactsRes.ok) {
        const data = await contactsRes.json()
        setContacts(data.contacts)
        setStats(data.stats)
      }

      // Fetch analytics
      const analyticsRes = await fetch('/api/admin/analytics', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
      if (analyticsRes.ok) {
        const data = await analyticsRes.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
    setContacts([])
    setStats(null)
    setAnalytics(null)
    setPassword('')
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

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const getDeviceIcon = (device: string) => {
    switch (device?.toLowerCase()) {
      case 'mobile': return <Smartphone className="w-4 h-4" />
      case 'tablet': return <Tablet className="w-4 h-4" />
      default: return <Monitor className="w-4 h-4" />
    }
  }

  // Mock data for unauthenticated view
  const mockStats = { total_submissions: '--', this_week: '-', today: '-' }
  const mockContacts = [
    { id: 1, name: '[Protected]', email: '[Protected]', message: '[Hidden]', created_at: '2024-01-01T00:00:00.000Z', user_agent: '[Protected]', ip_address: '[Protected]' },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.bg }}>
      {/* Main Content */}
      <div className={`max-w-7xl mx-auto px-4 py-8 transition-all duration-500 ${
        !isAuthenticated ? 'filter blur-sm opacity-50 pointer-events-none select-none' : ''
      }`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold font-mono" style={{ color: theme.text }}>
              Admin Dashboard
            </h1>
            {/* Tab Switcher */}
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 font-mono text-sm transition-all ${
                  activeTab === 'analytics' ? 'bg-white text-black' : 'border border-white/30 text-white/60 hover:text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-4 py-2 font-mono text-sm transition-all ${
                  activeTab === 'contacts' ? 'bg-white text-black' : 'border border-white/30 text-white/60 hover:text-white'
                }`}
              >
                <Mail className="w-4 h-4 inline mr-2" />
                Contacts
              </button>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border transition-colors font-mono text-sm"
            style={{ borderColor: theme.border, color: theme.textSoft }}
          >
            Logout
          </button>
        </div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && analytics && (
          <div className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'Total Views', value: analytics.overview.total_page_views, icon: Eye },
                { label: 'Views Today', value: analytics.overview.views_today, icon: TrendingUp },
                { label: 'This Week', value: analytics.overview.views_this_week, icon: Calendar },
                { label: 'Unique Visitors', value: analytics.overview.unique_visitors, icon: Users },
                { label: 'Visitors Today', value: analytics.overview.visitors_today, icon: User },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 border"
                  style={{ backgroundColor: theme.surface, borderColor: theme.border }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-4 h-4" style={{ color: theme.textMuted }} />
                  </div>
                  <p className="text-2xl font-bold font-mono" style={{ color: theme.text }}>{stat.value}</p>
                  <p className="text-xs" style={{ color: theme.textMuted }}>{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Views Over Time */}
              <div className="p-4 border" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
                <h3 className="text-sm font-mono mb-4 flex items-center gap-2" style={{ color: theme.text }}>
                  <TrendingUp className="w-4 h-4" /> Last 7 Days
                </h3>
                <div className="flex items-end gap-1 h-24">
                  {analytics.viewsOverTime.map((day, i) => {
                    const maxViews = Math.max(...analytics.viewsOverTime.map(d => parseInt(d.views) || 1))
                    const height = (parseInt(day.views) / maxViews) * 100
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-white/80 transition-all hover:bg-white"
                          style={{ height: `${Math.max(height, 5)}%` }}
                          title={`${day.views} views`}
                        />
                        <span className="text-[9px]" style={{ color: theme.textMuted }}>
                          {formatShortDate(day.date)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Device Breakdown */}
              <div className="p-4 border" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
                <h3 className="text-sm font-mono mb-4 flex items-center gap-2" style={{ color: theme.text }}>
                  <Monitor className="w-4 h-4" /> Devices
                </h3>
                <div className="space-y-2">
                  {analytics.deviceStats.map((device) => {
                    const total = analytics.deviceStats.reduce((a, b) => a + parseInt(b.count), 0)
                    const percent = Math.round((parseInt(device.count) / total) * 100)
                    return (
                      <div key={device.device_type} className="flex items-center gap-2">
                        {getDeviceIcon(device.device_type)}
                        <span className="flex-1 text-xs capitalize" style={{ color: theme.textSoft }}>
                          {device.device_type}
                        </span>
                        <span className="text-xs font-mono" style={{ color: theme.text }}>{percent}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Browser Breakdown */}
              <div className="p-4 border" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
                <h3 className="text-sm font-mono mb-4 flex items-center gap-2" style={{ color: theme.text }}>
                  <Chrome className="w-4 h-4" /> Browsers
                </h3>
                <div className="space-y-2">
                  {analytics.browserStats.map((browser) => {
                    const total = analytics.browserStats.reduce((a, b) => a + parseInt(b.count), 0)
                    const percent = Math.round((parseInt(browser.count) / total) * 100)
                    return (
                      <div key={browser.browser} className="flex items-center gap-2">
                        <span className="flex-1 text-xs" style={{ color: theme.textSoft }}>{browser.browser}</span>
                        <span className="text-xs font-mono" style={{ color: theme.text }}>{percent}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Top Pages */}
              <div className="p-4 border" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
                <h3 className="text-sm font-mono mb-4 flex items-center gap-2" style={{ color: theme.text }}>
                  <Layout className="w-4 h-4" /> Top Pages
                </h3>
                <div className="space-y-2">
                  {analytics.pageStats.map((page) => (
                    <div key={page.page_path} className="flex items-center justify-between">
                      <span className="text-xs truncate flex-1" style={{ color: theme.textSoft }}>
                        {page.page_path}
                      </span>
                      <span className="text-xs font-mono ml-2" style={{ color: theme.text }}>
                        {page.views}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Countries */}
              <div className="p-4 border" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
                <h3 className="text-sm font-mono mb-4 flex items-center gap-2" style={{ color: theme.text }}>
                  <MapPin className="w-4 h-4" /> Countries
                </h3>
                <div className="space-y-2">
                  {analytics.countryStats.map((country) => (
                    <div key={country.country} className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: theme.textSoft }}>{country.country}</span>
                      <span className="text-xs font-mono" style={{ color: theme.text }}>{country.count}</span>
                    </div>
                  ))}
                  {analytics.countryStats.length === 0 && (
                    <p className="text-xs" style={{ color: theme.textMuted }}>No data yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Visitors Table */}
            <div className="border overflow-hidden" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
              <div className="px-4 py-3 border-b" style={{ borderColor: theme.border }}>
                <h3 className="text-sm font-mono flex items-center gap-2" style={{ color: theme.text }}>
                  <Users className="w-4 h-4" /> Recent Visitors
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: theme.elevated }}>
                      <th className="px-4 py-2 text-left text-xs font-mono" style={{ color: theme.textMuted }}>IP</th>
                      <th className="px-4 py-2 text-left text-xs font-mono" style={{ color: theme.textMuted }}>Location</th>
                      <th className="px-4 py-2 text-left text-xs font-mono" style={{ color: theme.textMuted }}>Device</th>
                      <th className="px-4 py-2 text-left text-xs font-mono" style={{ color: theme.textMuted }}>Browser/OS</th>
                      <th className="px-4 py-2 text-left text-xs font-mono" style={{ color: theme.textMuted }}>Visits</th>
                      <th className="px-4 py-2 text-left text-xs font-mono" style={{ color: theme.textMuted }}>Last Visit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.recentVisitors.map((visitor, index) => (
                      <tr key={visitor.visitor_id} className="border-t" style={{ borderColor: theme.border }}>
                        <td className="px-4 py-2 text-xs font-mono" style={{ color: theme.textSoft }}>
                          {visitor.ip_address?.substring(0, 15) || '-'}
                        </td>
                        <td className="px-4 py-2 text-xs" style={{ color: theme.textSoft }}>
                          {visitor.city && visitor.country ? `${visitor.city}, ${visitor.country}` : visitor.country || '-'}
                        </td>
                        <td className="px-4 py-2 text-xs" style={{ color: theme.textSoft }}>
                          <span className="flex items-center gap-1">
                            {getDeviceIcon(visitor.device_type)}
                            {visitor.device_type || '-'}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-xs" style={{ color: theme.textSoft }}>
                          {visitor.browser} / {visitor.os}
                        </td>
                        <td className="px-4 py-2 text-xs font-mono" style={{ color: theme.text }}>
                          {visitor.visit_count}
                        </td>
                        <td className="px-4 py-2 text-xs" style={{ color: theme.textMuted }}>
                          {formatDate(visitor.last_visit)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            {/* Contact Stats */}
            {(isAuthenticated ? stats : mockStats) && (
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: 'Total Submissions', value: (isAuthenticated ? stats : mockStats)?.total_submissions, icon: Mail },
                  { label: 'This Week', value: (isAuthenticated ? stats : mockStats)?.this_week, icon: Calendar },
                  { label: 'Today', value: (isAuthenticated ? stats : mockStats)?.today, icon: Clock }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 border"
                    style={{ backgroundColor: theme.surface, borderColor: theme.border }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p style={{ color: theme.textMuted }}>{stat.label}</p>
                        <p className="text-2xl font-bold font-mono" style={{ color: theme.text }}>{stat.value}</p>
                      </div>
                      <stat.icon size={24} style={{ color: theme.accent }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Contacts Table */}
            <div className="border overflow-hidden" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
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
                    {(isAuthenticated ? contacts : mockContacts).map((contact, index) => (
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
                            <User size={16} className="mr-2" style={{ color: theme.accent }} />
                            {contact.name}
                          </div>
                        </td>
                        <td className="px-6 py-4" style={{ color: theme.textSoft }}>{contact.email}</td>
                        <td className="px-6 py-4" style={{ color: theme.textMuted }}>{formatDate(contact.created_at)}</td>
                        <td className="px-6 py-4" style={{ color: theme.textSoft }}>
                          <div className="max-w-xs truncate">{contact.message}</div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => isAuthenticated && setSelectedContact(contact)}
                            disabled={!isAuthenticated}
                            className="px-3 py-1 text-sm transition-colors"
                            style={{ backgroundColor: theme.accent + '20', color: theme.accent, opacity: isAuthenticated ? 1 : 0.5 }}
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

            {contacts.length === 0 && isAuthenticated && (
              <div className="text-center py-12">
                <p style={{ color: theme.textMuted }}>No submissions yet</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Login Modal */}
      {!isAuthenticated && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="w-full max-w-md"
          >
            <div className="p-8 border" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 text-sm mb-6 transition-colors hover:text-white"
                style={{ color: theme.textMuted }}
              >
                <ArrowLeft size={16} />
                Back to Portfolio
              </button>

              <h1 className="text-2xl font-bold text-center mb-2 font-mono" style={{ color: theme.text }}>
                Admin Dashboard
              </h1>
              <p className="text-center mb-8 text-sm" style={{ color: theme.textMuted }}>
                Password protected
              </p>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border bg-transparent focus:outline-none transition-all font-mono"
                    style={{ borderColor: theme.border, color: theme.text }}
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: theme.textMuted }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {error && (
                  <p className="text-sm text-center p-3 border" style={{ color: theme.error, borderColor: theme.error }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 font-mono text-sm transition-all"
                  style={{ backgroundColor: theme.accent, color: theme.bg }}
                >
                  {loading ? 'Logging in...' : 'Access Dashboard'}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Contact Detail Modal */}
      {selectedContact && isAuthenticated && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedContact(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-2xl w-full p-6 border"
            style={{ backgroundColor: theme.surface, borderColor: theme.border }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4 font-mono" style={{ color: theme.text }}>
              Message from {selectedContact.name}
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: theme.textMuted }}>Email</p>
                <p style={{ color: theme.text }}>{selectedContact.email}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: theme.textMuted }}>Date</p>
                <p style={{ color: theme.text }}>{formatDate(selectedContact.created_at)}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: theme.textMuted }}>Message</p>
                <p className="p-3 border whitespace-pre-wrap" style={{ backgroundColor: theme.elevated, borderColor: theme.border, color: theme.text }}>
                  {selectedContact.message}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: theme.textMuted }}>IP Address</p>
                  <p className="font-mono" style={{ color: theme.textSoft }}>{selectedContact.ip_address}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: theme.textMuted }}>User Agent</p>
                  <p className="truncate" style={{ color: theme.textSoft }}>{selectedContact.user_agent}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedContact(null)}
              className="mt-6 px-4 py-2 transition-colors"
              style={{ backgroundColor: theme.accent, color: theme.bg }}
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}
