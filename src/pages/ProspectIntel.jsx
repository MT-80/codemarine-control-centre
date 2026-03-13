import React from 'react'
import { Target, Building2, Users, Mail, ExternalLink } from 'lucide-react'
import { PageHeader, StatusBadge, AudienceBadge, filterByAudience, StatCard } from '../components/UI'
import { useAudience } from '../App'
import { prospects } from '../data'

export default function ProspectIntel() {
  const { audience } = useAudience()
  const items = filterByAudience(prospects, audience)
  const totalDevs = items.reduce((s, p) => s + p.devCount, 0)
  const avgScore = Math.round(items.reduce((s, p) => s + p.score, 0) / items.length)

  return (
    <div>
      <PageHeader title="Prospect Intel" subtitle="Lead enrichment, signal detection, and scoring" icon={Target} color="#A78BFA" />
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="Active leads" value={items.length} color="#A78BFA" />
          <StatCard label="Total developers" value={totalDevs} color="#00B4D8" subtitle="Across all leads" />
          <StatCard label="Avg lead score" value={`${avgScore}/100`} color="#00E5A0" />
          <StatCard label="Hot replies" value={items.filter(p=>p.status==='replied-hot').length} color="#EF4444" />
        </div>

        {/* Pipeline */}
        <div className="grid grid-cols-4 gap-2 text-center">
          {[['signal','Signal detected',items.filter(p=>['engaged'].includes(p.status)).length],['outreach','Outreach sent',items.filter(p=>p.status==='outreach-sent').length],['replied','Replied',items.filter(p=>p.status==='replied-hot').length],['demo','Demo booked',items.filter(p=>p.status==='demo-booked').length]].map(([key,label,count]) => (
            <div key={key} className="bg-navy-800 border border-navy-500 rounded-lg py-3">
              <div className="text-lg font-mono font-semibold text-cm-purple">{count}</div>
              <div className="text-[8px] text-slate-500 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>

        {/* Lead cards */}
        <div className="space-y-3">
          {items.map(p => (
            <div key={p.id} className="bg-navy-800 border border-navy-500 rounded-lg p-5 hover:border-cm-purple/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: p.logoBg }}>{p.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-bold text-white">{p.company}</span>
                    <StatusBadge status={p.status} />
                    <AudienceBadge audience={p.audience} />
                  </div>
                  <div className="text-[10px] text-slate-500 mb-3">{p.stage} &bull; {p.vertical} &bull; {p.location}</div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[10px]">
                    <div><span className="text-slate-500 w-20 inline-block">Signal</span> <span className="text-slate-300">{p.signal}</span></div>
                    <div><span className="text-slate-500 w-20 inline-block">Developers</span> <span className="text-slate-300 font-mono">{p.devCount}</span></div>
                    <div><span className="text-slate-500 w-20 inline-block">Tech stack</span> <span className="text-cm-teal">{p.stack.join(', ')}</span></div>
                    <div><span className="text-slate-500 w-20 inline-block">AI tools</span> <span className="text-slate-300">{p.aiTools.join(', ')}</span></div>
                    <div><span className="text-slate-500 w-20 inline-block">Security</span> <span className={p.securityTools === 'None detected' || p.securityTools === 'None' ? 'text-cm-red' : 'text-slate-300'}>{p.securityTools}</span></div>
                    <div><span className="text-slate-500 w-20 inline-block">Contact</span> <span className="text-slate-300">{p.contact}</span></div>
                    <div><span className="text-slate-500 w-20 inline-block">Source</span> <span className="text-slate-400 text-[9px]">{p.signalSource}</span></div>
                  </div>
                  {/* Engagement history */}
                  {p.engagement.length > 0 && (
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <span className="text-[8px] text-slate-500">Activity:</span>
                      {p.engagement.map((e, i) => <span key={i} className="text-[8px] bg-navy-700 text-slate-400 px-1.5 py-0.5 rounded">{e}</span>)}
                    </div>
                  )}
                </div>
                {/* Score */}
                <div className="text-right flex-shrink-0 w-20">
                  <div className="text-2xl font-mono font-bold" style={{ color: p.score >= 85 ? '#00E5A0' : p.score >= 70 ? '#00B4D8' : '#F59E0B' }}>{p.score}</div>
                  <div className="text-[8px] text-slate-500">LEAD SCORE</div>
                  <div className="mt-2 h-1.5 rounded-full bg-navy-700 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${p.score}%`, background: p.score >= 85 ? '#00E5A0' : p.score >= 70 ? '#00B4D8' : '#F59E0B' }} />
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-navy-500/50 flex gap-2">
                <button className="px-3 py-1.5 rounded text-[9px] font-medium bg-cm-purple/15 text-cm-purple hover:bg-cm-purple/25 transition-colors flex items-center gap-1.5"><Mail size={10} /> Send outreach</button>
                <button className="px-3 py-1.5 rounded text-[9px] font-medium bg-navy-700 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5"><ExternalLink size={10} /> View company</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
