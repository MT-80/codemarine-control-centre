import React from 'react'
import { LayoutDashboard, Shield, FileText, Share2, MessageCircle, Target, Mail, Zap } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { PageHeader, StatCard, AgentDot, AudienceBadge, filterByAudience } from '../components/UI'
import { useAudience } from '../App'
import { dashStats, activityFeed, weeklyData } from '../data'

export default function Dashboard() {
  const { audience } = useAudience()
  const stats = dashStats.today
  const feed = filterByAudience(activityFeed, audience).slice(0, 15)

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Real-time overview of all 6 agents" icon={LayoutDashboard} color="#00B4D8" />
      <div className="p-6 space-y-6">
        {/* Stats grid */}
        <div className="grid grid-cols-6 gap-3">
          <StatCard label="Vulns detected" value={stats.vulns} color="#EF4444" subtitle="Today" trend={12} />
          <StatCard label="Content created" value={stats.content} color="#F59E0B" subtitle="Today" trend={8} />
          <StatCard label="Distributed" value={stats.distributed} color="#00B4D8" subtitle="Today" trend={15} />
          <StatCard label="Engagements" value={stats.engagements} color="#FB923C" subtitle="Today" trend={22} />
          <StatCard label="Leads qualified" value={stats.leads} color="#A78BFA" subtitle="Today" trend={-5} />
          <StatCard label="Installs" value={stats.installs} color="#00E5A0" subtitle="Today" trend={34} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Weekly chart */}
          <div className="col-span-2 bg-navy-800 border border-navy-500 rounded-lg p-4">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-3">This week - installs & leads</div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="gInstalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00E5A0" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#00E5A0" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A78BFA" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#A78BFA" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                <Tooltip contentStyle={{ background: '#101828', border: '1px solid #1E293B', borderRadius: 8, fontSize: 11 }} />
                <Area type="monotone" dataKey="installs" stroke="#00E5A0" fill="url(#gInstalls)" strokeWidth={2} />
                <Area type="monotone" dataKey="leads" stroke="#A78BFA" fill="url(#gLeads)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Quick agent status */}
          <div className="bg-navy-800 border border-navy-500 rounded-lg p-4">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-3">Agent status</div>
            <div className="space-y-2.5">
              {[
                { name: 'Vuln Monitor', color: '#EF4444', status: 'Scanning', detail: '8 detected today' },
                { name: 'Content Engine', color: '#F59E0B', status: '2 pending review', detail: '10 created today' },
                { name: 'Distribution', color: '#00B4D8', status: 'Active', detail: '42 posts today' },
                { name: 'Social Listener', color: '#FB923C', status: '1 draft ready', detail: '7 alerts today' },
                { name: 'Prospect Intel', color: '#A78BFA', status: 'Enriching', detail: '5 leads today' },
                { name: 'AI SDR', color: '#00E5A0', status: '1 hot reply', detail: '5 emails today' },
              ].map(a => (
                <div key={a.name} className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: a.color }} />
                  <div className="flex-1">
                    <div className="text-[10px] font-medium text-slate-300">{a.name}</div>
                    <div className="text-[9px] text-slate-500">{a.status}</div>
                  </div>
                  <div className="text-[9px] text-slate-500 font-mono">{a.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-navy-800 border border-navy-500 rounded-lg">
          <div className="px-4 py-3 border-b border-navy-500 flex items-center justify-between">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Live activity feed</div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cm-mint animate-pulse" />
              <span className="text-[9px] text-cm-mint font-mono">LIVE</span>
            </div>
          </div>
          <div className="divide-y divide-navy-500/50 max-h-80 overflow-y-auto">
            {feed.map((item, i) => (
              <div key={i} className="px-4 py-2.5 flex items-center gap-3 hover:bg-navy-700/30 transition-colors">
                <span className="text-[9px] text-slate-500 font-mono w-10 flex-shrink-0">{item.time}</span>
                <AgentDot agent={item.agent} />
                <span className="text-[10px] text-slate-300 flex-1">{item.action}</span>
                <AudienceBadge audience={item.audience} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
