import React, { useState } from 'react'
import { Mail, Send, Reply, Calendar, DollarSign, Eye, CheckCircle, Clock, Zap } from 'lucide-react'
import { PageHeader, StatusBadge, AudienceBadge, filterByAudience, StatCard } from '../components/UI'
import { useAudience } from '../App'
import { outreach, prospects } from '../data'

export default function AiSdr() {
  const { audience } = useAudience()
  const [tab, setTab] = useState('all')
  let items = filterByAudience(outreach, audience)
  if (tab === 'replied') items = items.filter(o => o.replied)
  else if (tab === 'pending') items = items.filter(o => !o.replied)

  const totalPipeline = items.filter(o => o.dealValue).reduce((s, o) => s + o.dealValue, 0)
  const replyRate = items.length > 0 ? Math.round((items.filter(o => o.replied).length / items.length) * 100) : 0

  return (
    <div>
      <PageHeader title="AI SDR" subtitle="Personalised outreach, reply tracking, and demo booking" icon={Mail} color="#00E5A0" />
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-5 gap-3">
          <StatCard label="Emails sent" value={items.length} color="#00B4D8" subtitle="Today" />
          <StatCard label="Opened" value={items.filter(o=>o.opened).length} color="#F59E0B" />
          <StatCard label="Replied" value={items.filter(o=>o.replied).length} color="#00E5A0" />
          <StatCard label="Reply rate" value={`${replyRate}%`} color={replyRate >= 10 ? '#00E5A0' : '#F59E0B'} subtitle="Target: 12-18%" />
          <StatCard label="Pipeline value" value={`$${totalPipeline.toLocaleString()}`} color="#00E5A0" subtitle="Annual" />
        </div>

        <div className="flex items-center gap-2">
          {[['all','All outreach'],['replied','Replied'],['pending','Awaiting reply']].map(([val,label]) => (
            <button key={val} onClick={() => setTab(val)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all ${tab === val ? 'bg-cm-mint/15 text-cm-mint' : 'bg-navy-700 text-slate-400 hover:text-slate-200'}`}>{label}</button>
          ))}
        </div>

        {/* Outreach list */}
        <div className="space-y-3">
          {items.map(o => {
            const prospect = prospects.find(p => p.id === o.prospectId)
            return (
              <div key={o.id} className={`bg-navy-800 border rounded-lg overflow-hidden transition-all ${o.status === 'replied' || o.status === 'demo-booked' ? 'border-cm-mint/40' : 'border-navy-500'}`}>
                {/* Email header */}
                <div className="bg-navy-700/50 px-4 py-2.5 border-b border-navy-500/50 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono ml-2">Instantly</span>
                  <div className="ml-auto flex items-center gap-3">
                    <StatusBadge status={o.status === 'demo-booked' ? 'demo-booked' : o.replied ? 'replied' : o.opened ? 'opened' : 'sent'} />
                    <AudienceBadge audience={o.audience} />
                  </div>
                </div>

                <div className="p-4">
                  {/* Subject & meta */}
                  <div className="mb-3">
                    <div className="text-sm font-semibold text-white mb-1">{o.subject}</div>
                    <div className="flex items-center gap-4 text-[9px] text-slate-500">
                      <span>To: <span className="text-slate-400">{o.email}</span></span>
                      <span>Sent: <span className="text-slate-400">{o.sentAt}</span></span>
                      {prospect && <span>Company: <span className="text-slate-400">{o.company} ({prospect.devCount} devs)</span></span>}
                    </div>
                  </div>

                  {/* Email body preview */}
                  <div className="text-[10px] text-slate-400 leading-relaxed bg-navy-900/50 rounded-lg p-3 border border-navy-500/30 mb-3">
                    {o.body}
                  </div>

                  {/* Tracking indicators */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1.5 text-[9px]">
                      <Send size={10} className="text-cm-teal" />
                      <span className="text-cm-teal">Sent</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px]">
                      {o.opened ? <Eye size={10} className="text-cm-mint" /> : <Eye size={10} className="text-slate-600" />}
                      <span className={o.opened ? 'text-cm-mint' : 'text-slate-600'}>{o.opened ? 'Opened' : 'Not opened'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px]">
                      {o.clicked ? <CheckCircle size={10} className="text-cm-mint" /> : <CheckCircle size={10} className="text-slate-600" />}
                      <span className={o.clicked ? 'text-cm-mint' : 'text-slate-600'}>{o.clicked ? 'Link clicked' : 'No click'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px]">
                      {o.replied ? <Reply size={10} className="text-cm-mint" /> : <Clock size={10} className="text-slate-600" />}
                      <span className={o.replied ? 'text-cm-mint font-semibold' : 'text-slate-600'}>{o.replied ? 'Replied!' : 'Awaiting'}</span>
                    </div>
                  </div>

                  {/* Reply */}
                  {o.replyText && (
                    <div className="border-l-2 border-cm-mint pl-3 py-2 bg-cm-mint/5 rounded-r-lg mb-3">
                      <div className="text-[9px] text-cm-mint font-semibold mb-1">Reply from {o.contact}:</div>
                      <div className="text-[10px] text-slate-300 leading-relaxed italic">"{o.replyText}"</div>
                    </div>
                  )}

                  {/* Deal value / demo */}
                  {(o.dealValue || o.demoDate) && (
                    <div className="bg-cm-mint/10 border border-cm-mint/30 rounded-lg px-3 py-2 flex items-center gap-4">
                      {o.dealValue && (
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <DollarSign size={12} className="text-cm-mint" />
                          <span className="text-cm-mint font-semibold font-mono">${o.dealValue.toLocaleString()} ARR</span>
                        </div>
                      )}
                      {o.demoDate && (
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <Calendar size={12} className="text-cm-mint" />
                          <span className="text-cm-mint font-medium">Demo: {o.demoDate}</span>
                        </div>
                      )}
                      <Zap size={12} className="text-cm-mint ml-auto" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
