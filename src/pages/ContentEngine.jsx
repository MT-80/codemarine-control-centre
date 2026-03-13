import React, { useState } from 'react'
import { FileText, Check, X, Eye, Clock, BarChart3 } from 'lucide-react'
import { PageHeader, StatusBadge, AudienceBadge, filterByAudience } from '../components/UI'
import { useAudience } from '../App'
import { content } from '../data'

const typeIcons = { blog: '📝', 'twitter-thread': '🐦', 'seo-page': '🔍', tiktok: '🎬', 'youtube-short': '▶️', report: '📊', 'ig-reel': '📸' }

export default function ContentEngine() {
  const { audience } = useAudience()
  const [tab, setTab] = useState('all')
  let items = filterByAudience(content, audience)
  if (tab === 'review') items = items.filter(c => c.status === 'pending-review')
  else if (tab === 'published') items = items.filter(c => c.status === 'published')

  const pending = filterByAudience(content, audience).filter(c => c.status === 'pending-review').length

  return (
    <div>
      <PageHeader title="Content Engine" subtitle="AI-generated content with human approval workflow" icon={FileText} color="#F59E0B" />
      <div className="p-6 space-y-4">
        {/* Tabs */}
        <div className="flex items-center gap-2">
          {[['all','All content'],['review',`Needs review (${pending})`],['published','Published']].map(([val,label]) => (
            <button key={val} onClick={() => setTab(val)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all ${tab === val ? 'bg-cm-amber/15 text-cm-amber' : 'bg-navy-700 text-slate-400 hover:text-slate-200'}`}>{label}</button>
          ))}
        </div>

        {/* Pending review banner */}
        {pending > 0 && tab !== 'published' && (
          <div className="bg-cm-amber/10 border border-cm-amber/30 rounded-lg px-4 py-3 flex items-center gap-3">
            <Clock size={14} className="text-cm-amber flex-shrink-0" />
            <span className="text-xs text-cm-amber font-medium">{pending} content piece{pending > 1 ? 's' : ''} awaiting your review</span>
          </div>
        )}

        {/* Content list */}
        <div className="space-y-2">
          {items.map(c => (
            <div key={c.id} className={`bg-navy-800 border rounded-lg p-4 transition-all ${c.status === 'pending-review' ? 'border-cm-amber/40' : 'border-navy-500'}`}>
              <div className="flex items-start gap-3">
                <div className="text-lg mt-0.5">{typeIcons[c.type] || '📄'}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-semibold text-white">{c.title}</span>
                    <StatusBadge status={c.status} />
                    <AudienceBadge audience={c.audience} />
                  </div>
                  <div className="flex items-center gap-3 text-[9px] text-slate-500">
                    <span className="font-mono uppercase">{c.type.replace(/-/g, ' ')}</span>
                    {c.vulnRef && <span>Source: <span className="text-slate-400">{c.vulnRef}</span></span>}
                    {c.words && <span>{c.words} words</span>}
                    {c.seoScore && <span>SEO: <span className="text-cm-mint">{c.seoScore}/100</span></span>}
                    {c.geoOptimised && <span className="text-cm-teal">GEO optimised</span>}
                    {c.duration && <span>{c.duration}</span>}
                    {c.creator && <span>{c.creator}</span>}
                  </div>
                  {/* Performance metrics */}
                  {c.performance && (
                    <div className="mt-2 flex items-center gap-4">
                      {c.performance.views && <div className="text-[9px]"><span className="text-slate-500">Views:</span> <span className="text-slate-300 font-mono">{c.performance.views.toLocaleString()}</span></div>}
                      {c.performance.impressions && <div className="text-[9px]"><span className="text-slate-500">Impr:</span> <span className="text-slate-300 font-mono">{c.performance.impressions.toLocaleString()}</span></div>}
                      {c.performance.conversions && <div className="text-[9px]"><span className="text-slate-500">Conv:</span> <span className="text-cm-mint font-mono">{c.performance.conversions}</span></div>}
                      {c.performance.likes && <div className="text-[9px]"><span className="text-slate-500">Likes:</span> <span className="text-slate-300 font-mono">{c.performance.likes.toLocaleString()}</span></div>}
                      {c.performance.retweets && <div className="text-[9px]"><span className="text-slate-500">RTs:</span> <span className="text-slate-300 font-mono">{c.performance.retweets}</span></div>}
                      {c.performance.comments && <div className="text-[9px]"><span className="text-slate-500">Comments:</span> <span className="text-slate-300 font-mono">{c.performance.comments}</span></div>}
                      {c.performance.shares && <div className="text-[9px]"><span className="text-slate-500">Shares:</span> <span className="text-slate-300 font-mono">{c.performance.shares}</span></div>}
                      {c.conversionRate && <div className="text-[9px]"><span className="text-slate-500">Conv rate:</span> <span className="text-cm-mint font-mono">{c.conversionRate}</span></div>}
                    </div>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[9px] text-slate-500 font-mono">{c.time}</div>
                  <div className="text-[8px] text-slate-600">{c.date}</div>
                </div>
              </div>
              {c.status === 'pending-review' && (
                <div className="mt-3 pt-3 border-t border-navy-500/50 flex gap-2">
                  <button className="px-3 py-1.5 rounded text-[9px] font-semibold bg-cm-mint/15 text-cm-mint hover:bg-cm-mint/25 transition-colors flex items-center gap-1.5"><Check size={10} /> Approve & publish</button>
                  <button className="px-3 py-1.5 rounded text-[9px] font-medium bg-navy-700 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5"><Eye size={10} /> Preview</button>
                  <button className="px-3 py-1.5 rounded text-[9px] font-medium bg-navy-700 text-slate-400 hover:text-cm-red transition-colors flex items-center gap-1.5"><X size={10} /> Reject</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
