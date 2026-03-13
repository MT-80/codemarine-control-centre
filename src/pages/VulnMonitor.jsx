import React, { useState } from 'react'
import { Shield, AlertTriangle, Search, Filter } from 'lucide-react'
import { PageHeader, SeverityBadge, StatusBadge, AudienceBadge, filterByAudience } from '../components/UI'
import { useAudience } from '../App'
import { vulns } from '../data'

export default function VulnMonitor() {
  const { audience } = useAudience()
  const [filter, setFilter] = useState('all')
  let items = filterByAudience(vulns, audience)
  if (filter !== 'all') items = items.filter(v => v.type === filter)

  return (
    <div>
      <PageHeader title="Vuln Monitor" subtitle="CVE tracking, slopsquat detection, and vibe app scanning" icon={Shield} color="#EF4444" />
      <div className="p-6 space-y-4">
        {/* Filters */}
        <div className="flex items-center gap-2">
          {[['all','All'],['cve','CVEs'],['slopsquat','Slopsquats'],['vibe-scan','Vibe Scans'],['vibe-check','Vibe Checks']].map(([val,label]) => (
            <button key={val} onClick={() => setFilter(val)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all ${filter === val ? 'bg-cm-red/15 text-cm-red' : 'bg-navy-700 text-slate-400 hover:text-slate-200'}`}>{label}</button>
          ))}
          <div className="ml-auto text-[10px] text-slate-500 font-mono">{items.length} results</div>
        </div>

        {/* Vuln list */}
        <div className="space-y-2">
          {items.map(v => (
            <div key={v.id} className="bg-navy-800 border border-navy-500 rounded-lg p-4 hover:border-navy-500/80 transition-all">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <AlertTriangle size={16} className={v.severity === 'critical' ? 'text-cm-red' : v.severity === 'high' ? 'text-cm-amber' : 'text-cm-purple'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="font-mono text-xs font-semibold text-white">{v.id}</span>
                    <SeverityBadge severity={v.severity} />
                    <StatusBadge status={v.status} />
                    <AudienceBadge audience={v.audience} />
                    {v.cvss && <span className="font-mono text-[9px] text-cm-red">CVSS {v.cvss}</span>}
                  </div>
                  <div className="text-xs text-slate-300 mb-1">
                    <span className="font-semibold text-white">{v.pkg}</span>
                    <span className="text-slate-500 mx-1.5">/</span>
                    <span className="text-slate-400">{v.ecosystem}</span>
                    {v.downloads && <span className="text-slate-500 ml-2 font-mono text-[9px]">{v.downloads}</span>}
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">{v.desc}</p>
                  {v.aiRecommended && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="text-[8px] bg-cm-red/15 text-cm-red px-1.5 py-0.5 rounded font-semibold">AI-RECOMMENDED</span>
                      <span className="text-[9px] text-slate-500">by {v.aiTools.join(', ')}</span>
                    </div>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[9px] text-slate-500 font-mono">{v.time}</div>
                  <div className="text-[8px] text-slate-600">{v.date}</div>
                </div>
              </div>
              {v.status === 'content-pending' || v.status === 'queued' ? (
                <div className="mt-3 pt-3 border-t border-navy-500/50 flex gap-2">
                  <button className="px-3 py-1 rounded text-[9px] font-medium bg-cm-amber/15 text-cm-amber hover:bg-cm-amber/25 transition-colors">Generate content</button>
                  <button className="px-3 py-1 rounded text-[9px] font-medium bg-navy-700 text-slate-400 hover:text-slate-200 transition-colors">Dismiss</button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
