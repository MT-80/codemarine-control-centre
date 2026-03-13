import React, { useState, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { LayoutDashboard, Shield, FileText, Share2, MessageCircle, Target, Mail, Settings, Anchor, ChevronDown } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import VulnMonitor from './pages/VulnMonitor'
import ContentEngine from './pages/ContentEngine'
import Distribution from './pages/Distribution'
import SocialListener from './pages/SocialListener'
import ProspectIntel from './pages/ProspectIntel'
import AiSdr from './pages/AiSdr'

export const AudienceContext = createContext()
export const useAudience = () => useContext(AudienceContext)

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard', color: '#00B4D8' },
  { path: '/vuln-monitor', icon: Shield, label: 'Vuln Monitor', color: '#EF4444' },
  { path: '/content', icon: FileText, label: 'Content Engine', color: '#F59E0B' },
  { path: '/distribution', icon: Share2, label: 'Distribution', color: '#00B4D8' },
  { path: '/social', icon: MessageCircle, label: 'Social Listener', color: '#FB923C' },
  { path: '/prospects', icon: Target, label: 'Prospect Intel', color: '#A78BFA' },
  { path: '/sdr', icon: Mail, label: 'AI SDR', color: '#00E5A0' },
]

function AudienceToggle({ audience, setAudience }) {
  return (
    <div className="flex bg-navy-700 rounded-lg p-0.5 gap-0.5">
      {[['both', 'Both'], ['dev', 'Dev'], ['vibe', 'Vibe']].map(([val, label]) => (
        <button key={val} onClick={() => setAudience(val)}
          className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${audience === val ? 'bg-cm-teal text-navy-900' : 'text-slate-400 hover:text-slate-200'}`}>
          {label}
        </button>
      ))}
    </div>
  )
}

function Sidebar({ audience, setAudience }) {
  return (
    <aside className="w-52 bg-navy-800 border-r border-navy-500 flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-navy-500">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full border-[1.5px] border-cm-teal flex items-center justify-center">
            <Anchor size={12} className="text-cm-teal" />
          </div>
          <span className="text-sm font-bold text-cm-teal tracking-wide">CODEMARINE</span>
        </div>
        <div className="text-[9px] text-slate-500 tracking-[3px] uppercase mb-3">Control centre</div>
        <AudienceToggle audience={audience} setAudience={setAudience} />
      </div>
      <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map(item => (
          <NavLink key={item.path} to={item.path} end={item.path === '/'}
            className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all group ${isActive ? 'bg-navy-700 text-white' : 'text-slate-400 hover:bg-navy-700/50 hover:text-slate-200'}`}>
            {({ isActive }) => (<>
              <item.icon size={14} style={{ color: isActive ? item.color : undefined }} className={isActive ? '' : 'text-slate-500 group-hover:text-slate-400'} />
              <span>{item.label}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />}
            </>)}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-navy-500">
        <div className="flex items-center gap-2 px-2">
          <div className="w-6 h-6 rounded-full bg-cm-teal/20 flex items-center justify-center text-[9px] font-bold text-cm-teal">MC</div>
          <div>
            <div className="text-[10px] font-medium text-slate-300">matt@codemarine.ai</div>
            <div className="text-[8px] text-slate-500">Commander</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default function App() {
  const [audience, setAudience] = useState('both')
  return (
    <AudienceContext.Provider value={{ audience, setAudience }}>
      <BrowserRouter>
        <div className="h-screen flex overflow-hidden">
          <Sidebar audience={audience} setAudience={setAudience} />
          <main className="flex-1 overflow-y-auto bg-navy-900">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/vuln-monitor" element={<VulnMonitor />} />
              <Route path="/content" element={<ContentEngine />} />
              <Route path="/distribution" element={<Distribution />} />
              <Route path="/social" element={<SocialListener />} />
              <Route path="/prospects" element={<ProspectIntel />} />
              <Route path="/sdr" element={<AiSdr />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AudienceContext.Provider>
  )
}
