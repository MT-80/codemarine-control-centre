import React from 'react'
import { Share2, TrendingUp, ExternalLink } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { PageHeader, StatCard } from '../components/UI'
import { useAudience } from '../App'
import { channels, weeklyData } from '../data'

export default function Distribution() {
  const { audience } = useAudience()
  const devCh = audience !== 'vibe' ? channels.dev : []
  const vibeCh = audience !== 'dev' ? channels.vibe : []

  return (
    <div>
      <PageHeader title="Distribution" subtitle="Channel performance across dev and vibe coder audiences" icon={Share2} color="#00B4D8" />
      <div className="p-6 space-y-6">
        {/* Summary stats */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="Total impressions" value="221K" color="#00B4D8" subtitle="This week" trend={18} />
          <StatCard label="Total engagements" value="5.4K" color="#FB923C" subtitle="This week" trend={22} />
          <StatCard label="Link clicks" value="2.1K" color="#00E5A0" subtitle="To /enlist" trend={31} />
          <StatCard label="Posts published" value="42" color="#F59E0B" subtitle="Today" />
        </div>

        {/* Chart */}
        <div className="bg-navy-800 border border-navy-500 rounded-lg p-4">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-3">Content output this week</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} width={25} />
              <Tooltip contentStyle={{ background: '#101828', border: '1px solid #1E293B', borderRadius: 8, fontSize: 11 }} />
              <Bar dataKey="content" fill="#F59E0B" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Dev channels */}
        {devCh.length > 0 && (
          <div>
            <div className="text-[10px] text-cm-teal uppercase tracking-wider font-semibold mb-3">Developer channels</div>
            <div className="grid grid-cols-2 gap-3">
              {devCh.map(ch => (
                <div key={ch.name} className="bg-navy-800 border border-navy-500 rounded-lg p-4 hover:border-cm-teal/30 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: ch.color }} />
                    <span className="text-xs font-semibold text-white">{ch.name}</span>
                    {ch.handle && <span className="text-[9px] text-slate-500 font-mono">{ch.handle}</span>}
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {ch.posts && <div><div className="text-sm font-mono font-semibold text-slate-200">{ch.posts}</div><div className="text-[8px] text-slate-500">Posts</div></div>}
                    {ch.impressions && <div><div className="text-sm font-mono font-semibold text-slate-200">{(ch.impressions/1000).toFixed(1)}K</div><div className="text-[8px] text-slate-500">Impressions</div></div>}
                    {ch.upvotes && <div><div className="text-sm font-mono font-semibold text-slate-200">{ch.upvotes.toLocaleString()}</div><div className="text-[8px] text-slate-500">Upvotes</div></div>}
                    {ch.points && <div><div className="text-sm font-mono font-semibold text-slate-200">{ch.points}</div><div className="text-[8px] text-slate-500">Points</div></div>}
                    {ch.comments && <div><div className="text-sm font-mono font-semibold text-slate-200">{ch.comments}</div><div className="text-[8px] text-slate-500">Comments</div></div>}
                    {ch.engagement && <div><div className="text-sm font-mono font-semibold text-cm-mint">{ch.engagement}</div><div className="text-[8px] text-slate-500">Engagement</div></div>}
                    {ch.stars && <div><div className="text-sm font-mono font-semibold text-slate-200">{ch.stars}</div><div className="text-[8px] text-slate-500">Stars</div></div>}
                    {ch.profileVisits && <div><div className="text-sm font-mono font-semibold text-slate-200">{ch.profileVisits}</div><div className="text-[8px] text-slate-500">Profile visits</div></div>}
                  </div>
                  {ch.topPost && <div className="text-[9px] text-slate-500 pt-2 border-t border-navy-500/50">Top: <span className="text-slate-400">{ch.topPost}</span></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vibe channels */}
        {vibeCh.length > 0 && (
          <div>
            <div className="text-[10px] text-cm-purple uppercase tracking-wider font-semibold mb-3">Vibe coder channels</div>
            <div className="grid grid-cols-2 gap-3">
              {vibeCh.map(ch => (
                <div key={ch.name} className="bg-navy-800 border border-navy-500 rounded-lg p-4 hover:border-cm-purple/30 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: ch.color }} />
                    <span className="text-xs font-semibold text-white">{ch.name}</span>
                    {ch.handle && <span className="text-[9px] text-slate-500 font-mono">{ch.handle}</span>}
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {ch.videos && <div><div className="text-sm font-mono font-semibold text-slate-200">{ch.videos}</div><div className="text-[8px] text-slate-500">Videos</div></div>}
                    {ch.reels && <div><div className="text-sm font-mono font-semibold text-slate-200">{ch.reels}</div><div className="text-[8px] text-slate-500">Reels</div></div>}
                    {ch.views && <div><div className="text-sm font-mono font-semibold text-slate-200">{(ch.views/1000).toFixed(0)}K</div><div className="text-[8px] text-slate-500">Views</div></div>}
                    {ch.likes && <div><div className="text-sm font-mono font-semibold text-slate-200">{(ch.likes/1000).toFixed(1)}K</div><div className="text-[8px] text-slate-500">Likes</div></div>}
                    {ch.comments && <div><div className="text-sm font-mono font-semibold text-slate-200">{ch.comments.toLocaleString()}</div><div className="text-[8px] text-slate-500">Comments</div></div>}
                    {ch.saves && <div><div className="text-sm font-mono font-semibold text-slate-200">{ch.saves}</div><div className="text-[8px] text-slate-500">Saves</div></div>}
                    {ch.linkClicks && <div><div className="text-sm font-mono font-semibold text-cm-mint">{ch.linkClicks.toLocaleString()}</div><div className="text-[8px] text-slate-500">Link clicks</div></div>}
                    {ch.subscribers && <div><div className="text-sm font-mono font-semibold text-slate-200">{ch.subscribers.toLocaleString()}</div><div className="text-[8px] text-slate-500">Subscribers</div></div>}
                    {ch.watchThrough && <div><div className="text-sm font-mono font-semibold text-cm-mint">{ch.watchThrough}</div><div className="text-[8px] text-slate-500">Watch-through</div></div>}
                    {ch.reactions && <div><div className="text-sm font-mono font-semibold text-slate-200">{ch.reactions}</div><div className="text-[8px] text-slate-500">Reactions</div></div>}
                    {ch.messages && <div><div className="text-sm font-mono font-semibold text-slate-200">{ch.messages}</div><div className="text-[8px] text-slate-500">Messages</div></div>}
                    {ch.upvotes && <div><div className="text-sm font-mono font-semibold text-slate-200">{ch.upvotes}</div><div className="text-[8px] text-slate-500">Upvotes</div></div>}
                    {ch.launches && <div><div className="text-sm font-mono font-semibold text-slate-200">{ch.launches}</div><div className="text-[8px] text-slate-500">Launches</div></div>}
                  </div>
                  {ch.topPost && <div className="text-[9px] text-slate-500 pt-2 border-t border-navy-500/50">Top: <span className="text-slate-400">{ch.topPost}</span></div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
