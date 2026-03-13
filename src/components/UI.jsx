import React from 'react'
import { useAudience } from '../App'

export function PageHeader({ title, subtitle, icon: Icon, color }) {
  return (
    <div className="px-6 py-4 border-b border-navy-500 bg-navy-800/50 backdrop-blur sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {Icon && <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: color + '18' }}><Icon size={16} style={{ color }} /></div>}
        <div>
          <h1 className="text-base font-bold text-white">{title}</h1>
          {subtitle && <p className="text-[10px] text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}

export function StatCard({ label, value, color, subtitle, trend }) {
  return (
    <div className="bg-navy-800 border border-navy-500 rounded-lg p-3">
      <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-1">{label}</div>
      <div className="font-mono text-xl font-semibold" style={{ color }}>{value}</div>
      {subtitle && <div className="text-[9px] text-slate-500 mt-1">{subtitle}</div>}
      {trend && <div className={`text-[9px] font-medium mt-1 ${trend > 0 ? 'text-cm-mint' : 'text-cm-red'}`}>{trend > 0 ? '+' : ''}{trend}% vs last week</div>}
    </div>
  )
}

export function StatusBadge({ status }) {
  const styles = {
    'published': 'bg-emerald-500/15 text-emerald-400',
    'approved': 'bg-blue-500/15 text-blue-400',
    'pending-review': 'bg-amber-500/15 text-amber-400',
    'content-generated': 'bg-blue-500/15 text-blue-400',
    'content-pending': 'bg-amber-500/15 text-amber-400',
    'queued': 'bg-slate-500/15 text-slate-400',
    'scheduled': 'bg-purple-500/15 text-purple-400',
    'sent': 'bg-blue-500/15 text-blue-400',
    'opened': 'bg-amber-500/15 text-amber-400',
    'replied': 'bg-emerald-500/15 text-emerald-400',
    'replied-hot': 'bg-emerald-500/20 text-emerald-300',
    'demo-booked': 'bg-cm-mint/20 text-cm-mint',
    'responded': 'bg-emerald-500/15 text-emerald-400',
    'draft-ready': 'bg-amber-500/15 text-amber-400',
    'pending': 'bg-slate-500/15 text-slate-400',
    'engaged': 'bg-purple-500/15 text-purple-400',
    'outreach-sent': 'bg-blue-500/15 text-blue-400',
  }
  const label = status.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  return <span className={`px-2 py-0.5 rounded text-[8px] font-semibold uppercase tracking-wide ${styles[status] || 'bg-slate-500/15 text-slate-400'}`}>{label}</span>
}

export function AudienceBadge({ audience }) {
  if (audience === 'dev') return <span className="px-1.5 py-0.5 rounded text-[7px] font-bold bg-cm-teal/15 text-cm-teal tracking-wide">DEV</span>
  if (audience === 'vibe') return <span className="px-1.5 py-0.5 rounded text-[7px] font-bold bg-cm-purple/15 text-cm-purple tracking-wide">VIBE</span>
  return <span className="px-1.5 py-0.5 rounded text-[7px] font-bold bg-slate-500/15 text-slate-400 tracking-wide">BOTH</span>
}

export function SeverityBadge({ severity }) {
  const styles = {
    critical: 'bg-red-500/20 text-red-400',
    high: 'bg-amber-500/20 text-amber-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    aggregate: 'bg-purple-500/20 text-purple-400',
  }
  return <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${styles[severity] || 'bg-slate-500/15 text-slate-400'}`}>{severity}</span>
}

export function AgentDot({ agent }) {
  const colors = { vuln: '#EF4444', content: '#F59E0B', dist: '#00B4D8', social: '#FB923C', prospect: '#A78BFA', sdr: '#00E5A0' }
  return <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: colors[agent] || '#64748B' }} />
}

export function EmptyState({ icon: Icon, text }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-500">
      {Icon && <Icon size={32} className="mb-3 opacity-30" />}
      <p className="text-xs">{text}</p>
    </div>
  )
}

export function filterByAudience(items, audience) {
  if (audience === 'both') return items
  return items.filter(i => i.audience === audience || i.audience === 'both')
}
