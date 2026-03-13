import React, { useState } from 'react'
import { MessageCircle, Send, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { PageHeader, StatusBadge, AudienceBadge, filterByAudience, StatCard } from '../components/UI'
import { useAudience } from '../App'
import { socialAlerts } from '../data'

const platformIcons = { reddit: '🔴', discord: '💬', twitter: '🐦', hackernews: '🟠', tiktok: '🎵' }

export default function SocialListener() {
  const { audience } = useAudience()
  const [tab, setTab] = useState('all')
  let items = filterByAudience(socialAlerts, audience)
  if (tab === 'action') items = items.filter(a => a.status === 'draft-ready' || a.status === 'pending')
  else if (tab === 'responded') items = items.filter(a => a.status === 'responded')

  const actionNeeded = filterByAudience(socialAlerts, audience).filter(a => a.status === 'draft-ready' || a.status === 'pending').length

  return (
    <div>
      <PageHeader title="Social Listener" subtitle="Keyword monitoring across Reddit, HN, Discord, Twitter, TikTok" icon={MessageCircle} color="#FB923C" />
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="Alerts today" value={socialAlerts.length} color="#FB923C" />
          <StatCard label="Responded" value={socialAlerts.filter(a=>a.status==='responded').length} color="#00E5A0" />
          <StatCard label="Action needed" value={actionNeeded} color="#F59E0B" />
          <StatCard label="Platforms monitored" value="5" color="#00B4D8" subtitle="Reddit, HN, Discord, X, TikTok" />
        </div>

        <div className="flex items-center gap-2">
          {[['all','All alerts'],['action',`Action needed (${actionNeeded})`],['responded','Responded']].map(([val,label]) => (
            <button key={val} onClick={() => setTab(val)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all ${tab === val ? 'bg-cm-orange/15 text-cm-orange' : 'bg-navy-700 text-slate-400 hover:text-slate-200'}`}>{label}</button>
          ))}
        </div>

        {actionNeeded > 0 && tab !== 'responded' && (
          <div className="bg-cm-orange/10 border border-cm-orange/30 rounded-lg px-4 py-3 flex items-center gap-3">
            <AlertCircle size={14} className="text-cm-orange flex-shrink-0" />
            <span className="text-xs text-cm-orange font-medium">{actionNeeded} conversation{actionNeeded > 1 ? 's' : ''} need your attention</span>
          </div>
        )}

        <div className="space-y-2">
          {items.map(a => (
            <div key={a.id} className={`bg-navy-800 border rounded-lg p-4 transition-all ${a.status === 'draft-ready' || a.status === 'pending' ? 'border-cm-orange/40' : 'border-navy-500'}`}>
              <div className="flex items-start gap-3">
                <div className="text-lg">{platformIcons[a.platform]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-semibold text-white">{a.title}</span>
                    <StatusBadge status={a.status} />
                    <AudienceBadge audience={a.audience} />
                  </div>
                  <div className="flex items-center gap-3 text-[9px] text-slate-500 mb-2">
                    <span>{a.source}</span>
                    <span>Keyword: <span className="text-cm-orange font-mono">"{a.keyword}"</span></span>
                  </div>
                  {a.response && (
                    <div className={`text-[10px] leading-relaxed p-2.5 rounded-lg mt-1 ${a.status === 'responded' ? 'bg-cm-mint/5 border border-cm-mint/20 text-slate-300' : 'bg-cm-amber/5 border border-cm-amber/20 text-slate-400'}`}>
                      {a.status === 'responded' ? <CheckCircle size={10} className="inline text-cm-mint mr-1.5" /> : <Clock size={10} className="inline text-cm-amber mr-1.5" />}
                      {a.response}
                    </div>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[9px] text-slate-500 font-mono">{a.time}</div>
                </div>
              </div>
              {(a.status === 'draft-ready' || a.status === 'pending') && (
                <div className="mt-3 pt-3 border-t border-navy-500/50 flex gap-2">
                  {a.status === 'draft-ready' && <button className="px-3 py-1.5 rounded text-[9px] font-semibold bg-cm-mint/15 text-cm-mint hover:bg-cm-mint/25 transition-colors flex items-center gap-1.5"><Send size={10} /> Approve & post</button>}
                  {a.status === 'pending' && <button className="px-3 py-1.5 rounded text-[9px] font-medium bg-cm-amber/15 text-cm-amber hover:bg-cm-amber/25 transition-colors flex items-center gap-1.5"><MessageCircle size={10} /> Generate response</button>}
                  <button className="px-3 py-1.5 rounded text-[9px] font-medium bg-navy-700 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5"><Eye size={10} /> View thread</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
