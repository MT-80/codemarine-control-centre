import React, { useState, useEffect } from 'react'
import { Shield, FileText, Share2, MessageCircle, Target, Mail, Check, Clock, Zap, BarChart3, RefreshCw, ThumbsDown, ThumbsUp, Activity, LayoutDashboard, Code, Smartphone, Settings, X, Plus, Radio, Eye, Brain, Star, Megaphone, ChevronRight, ArrowRight, TrendingUp, Moon, Sun } from 'lucide-react'
import { agents, agentMap, messages, allMissions, dashboardStats, agentConfigs } from './data'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts'
import './index.css'

function useDarkMode(){
  const[dark,setDark]=useState(()=>localStorage.getItem('cm-dark')==='true')
  useEffect(()=>{document.documentElement.classList.toggle('dark',dark);localStorage.setItem('cm-dark',dark)},[dark])
  return[dark,setDark]
}
function DarkToggle({dark,setDark}){
  return(<button onClick={()=>setDark(!dark)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dk-bg3 transition-colors" title={dark?'Switch to light mode':'Switch to dark mode'}>{dark?<Sun size={14} className="text-amber-400"/>:<Moon size={14} className="text-gray-400"/>}</button>)
}

// Three independent paths
const PATH_CONTENT=[{key:'detect',agent:'scout'},{key:'create',agent:'intel'},{key:'distribute',agent:'comms'}]
const PATH_COMMUNITY=[{key:'engage',agent:'field'}]
const PATH_PROSPECT=[{key:'qualify',agent:'strategist'}]
const CONVERGENCE=[{key:'convert',agent:'operator'}]
// All for stage progress
const STAGES=[...PATH_CONTENT,...PATH_COMMUNITY,...PATH_PROSPECT,...CONVERGENCE]

const sevC={critical:'#EF4444',high:'#D97706',aggregate:'#7C3AED'}
const SevBadge=({s,cvss})=><span className="px-2 py-0.5 rounded text-[9px] font-bold text-white" style={{background:sevC[s]||'#6B7280'}}>{s.toUpperCase()}{cvss?` ${cvss}`:''}</span>

function AgentAvatar({id,size='md'}){
  const a=agentMap[id]; if(!a) return null
  const s=size==='sm'?'w-6 h-6 text-xs':size==='lg'?'w-10 h-10 text-lg':'w-8 h-8 text-sm'
  return <div className={`${s} rounded-lg flex items-center justify-center flex-shrink-0`} style={{background:a.bg,border:`1.5px solid ${a.color}`}} title={a.name}><span>{a.emoji}</span></div>
}

function FeedbackBar(){
  const[fb,setFb]=useState(null)
  return(<div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-100">
    <span className="text-[8px] text-gray-400 mr-1">Feedback:</span>
    <button onClick={()=>setFb('good')} className={`p-1 rounded transition-colors ${fb==='good'?'bg-emerald-100 text-emerald-600':'hover:bg-emerald-50 text-gray-300 hover:text-emerald-500'}`}><ThumbsUp size={11}/></button>
    <button onClick={()=>setFb('bad')} className={`p-1 rounded transition-colors ${fb==='bad'?'bg-red-100 text-red-600':'hover:bg-red-50 text-gray-300 hover:text-red-500'}`}><ThumbsDown size={11}/></button>
    <button className="p-1 rounded hover:bg-blue-50 text-gray-300 hover:text-[#1B4D3E] transition-colors flex items-center gap-0.5"><RefreshCw size={11}/><span className="text-[8px]">Redo</span></button>
    {fb&&<span className="text-[8px] text-emerald-500 ml-1">Noted</span>}
  </div>)
}

function StageProgress({m}){
  const getSt=(k)=>{if(k==='detect')return'done';const items=m[k];if(!items||!items.length)return'empty';if(k==='create'&&items.some(c=>c.status==='pending-review'))return'review';return'done'}
  return(<div className="flex items-center gap-0.5">{STAGES.map(({key,agent},i)=>{const st=getSt(key);const a=agentMap[agent];return(<React.Fragment key={key}><div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px]" style={st==='done'?{background:a.color,color:'white'}:st==='review'?{background:a.bg,border:`1.5px solid ${a.color}`}:{background:'#F1F5F9'}} title={a.name}>{st==='done'?<Check size={9}/>:st==='review'?<Clock size={8} style={{color:a.color}}/>:<span style={{fontSize:9}}>{a.emoji}</span>}</div>{i<5&&<div className={`w-2 h-px ${st!=='empty'?'bg-gray-300':'bg-gray-100'}`}/>}</React.Fragment>)})}</div>)
}

// ===== PLATFORM UI COMPONENTS =====
function XPost({x}){return(
  <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"><div className="flex items-center gap-2.5 mb-2.5"><div className="w-10 h-10 rounded-full bg-[#1B4D3E] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">CM</div><div className="flex-1"><div className="flex items-center gap-1"><span className="font-bold text-[13px] text-gray-900">{x.name}</span>{x.verified&&<svg className="w-[14px] h-[14px] text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/></svg>}</div><span className="text-[11px] text-gray-500">{x.handle} &middot; {x.time}</span></div></div><div className="text-[13px] text-gray-900 leading-[1.5] whitespace-pre-line mb-3">{x.text}</div><div className="flex items-center gap-5 pt-2.5 border-t border-gray-100 text-[12px] text-gray-500"><span className="flex items-center gap-1"><MessageCircle size={14}/>{x.metrics.replies}</span><span className="flex items-center gap-1"><RefreshCw size={14}/>{x.metrics.retweets}</span><span className="flex items-center gap-1">&#10084;&#65039; {x.metrics.likes}</span><span className="flex items-center gap-1"><BarChart3 size={14}/>{x.metrics.views}</span></div><FeedbackBar/></div>
)}

function TikTokPost({t,pending}){return(
  <div className={`bg-[#161823] rounded-2xl overflow-hidden shadow-sm border max-w-[280px] ${pending?'border-amber-400 border-2':'border-gray-200'}`}><div className="h-[180px] bg-gradient-to-b from-[#1a0a2e] via-[#12001f] to-[#080012] flex items-center justify-center relative"><div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl">&#9654;</div><div className="absolute right-3 bottom-3 flex flex-col gap-2 items-center"><div className="text-center"><div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs">&#10084;</div><div className="text-[8px] text-white font-semibold">{t.metrics.likes}</div></div><div className="text-center"><div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs">&#128172;</div><div className="text-[8px] text-white font-semibold">{t.metrics.comments}</div></div></div>{pending&&<div className="absolute top-2 left-2 px-2 py-0.5 bg-amber-400 text-black text-[8px] font-bold rounded">REVIEW</div>}<div className="absolute top-2 right-2 text-[9px] text-white/60 font-mono">{t.metrics.views}</div></div><div className="p-3"><div className="text-[11px] font-bold text-white mb-1">{t.user}</div><div className="text-[10px] text-gray-300 leading-relaxed">{t.desc}</div><div className="text-[9px] text-cyan-400 mt-1.5">{t.tags}</div></div>{pending&&<div className="px-3 pb-3 flex gap-2"><button className="flex-1 py-1 rounded-lg text-[9px] font-bold bg-emerald-500 text-white">Approve</button><button className="flex-1 py-1 rounded-lg text-[9px] font-bold bg-white/10 text-white">Reject</button></div>}</div>
)}

function EmailUI({c}){return(
  <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200"><div className="bg-[#F6F6F6] px-3 py-1.5 flex items-center gap-2 border-b border-gray-200"><div className="flex gap-1"><div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"/><div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"/><div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"/></div><span className="text-[9px] text-gray-400 ml-2 font-mono">Instantly</span><Mail size={10} className="text-gray-400 ml-auto"/></div><div className="bg-white"><div className="px-4 py-2.5 border-b border-gray-100"><div className="text-sm font-semibold text-gray-900">{c.subject}</div><div className="text-[10px] text-gray-500 mt-0.5">From: {c.from}</div><div className="text-[10px] text-gray-500">To: {c.to}</div></div><div className="px-4 py-3 text-[12px] text-gray-700 leading-[1.6] whitespace-pre-line">{c.body}</div><div className="px-4 py-1.5 border-t border-gray-100 text-[9px] text-gray-400 font-mono">Matt | CodeMarine</div></div><FeedbackBar/></div>
)}

function LeadCard({l}){return(
  <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{background:l.logoBg}}>{l.logo}</div><div className="flex-1"><div className="font-bold text-sm text-gray-900">{l.company}</div><div className="text-[9px] text-gray-500">{l.stage} &bull; {l.devs} devs &bull; {l.stack}</div></div><div className="text-right"><div className="text-lg font-mono font-bold" style={{color:l.score>=80?'#059669':'#0891B2'}}>{l.score}</div><div className="text-[7px] text-gray-400">SCORE</div></div></div><div className="mt-2 text-[10px] text-gray-600"><span className="text-gray-400">Signal: </span>{l.signal}</div><div className="mt-1 h-1 rounded-full bg-gray-100"><div className="h-full rounded-full" style={{width:`${l.score}%`,background:l.score>=80?'#059669':'#0891B2'}}/></div><FeedbackBar/></div>
)}

// ===== MISSION DETAIL =====
function TypeWriter({text,speed=20,onDone}){
  const[displayed,setDisplayed]=useState('')
  const[done,setDone]=useState(false)
  React.useEffect(()=>{setDisplayed('');setDone(false);let i=0;const iv=setInterval(()=>{if(i<text.length){setDisplayed(text.slice(0,i+1));i++}else{clearInterval(iv);setDone(true);onDone&&onDone()}},speed);return()=>clearInterval(iv)},[text])
  return<span>{displayed}{!done&&<span className="inline-block w-[2px] h-3 bg-current animate-pulse ml-0.5 align-middle"/>}</span>
}

function CountUp({target,duration=1200,prefix='',suffix=''}){
  const[val,setVal]=useState(0)
  React.useEffect(()=>{const num=typeof target==='number'?target:parseInt(target.replace(/[^0-9]/g,''))||0;if(!num){setVal(target);return}let start=0;const step=Math.max(1,Math.floor(num/60));const iv=setInterval(()=>{start+=step;if(start>=num){setVal(num);clearInterval(iv)}else setVal(start)},duration/60);return()=>clearInterval(iv)},[target])
  return<span>{prefix}{typeof val==='number'?val.toLocaleString():val}{suffix}</span>
}

function AnimatedArrow({active}){
  return(<div className={`flex items-center justify-center py-2 transition-all duration-500 ${active?'opacity-100':'opacity-0'}`}>
    <div className="flex items-center gap-1">
      <div className={`w-6 h-0.5 bg-gradient-to-r from-transparent to-[#1B4D3E] rounded ${active?'animate-pulse':''}`}/>
      <ArrowRight size={14} className="text-[#1B4D3E] animate-bounce"/>
      <div className={`w-6 h-0.5 bg-gradient-to-l from-transparent to-[#1B4D3E] rounded ${active?'animate-pulse':''}`}/>
    </div>
  </div>)
}

// Node positions for the graph layout
const NODE_LAYOUT = {
  scout:      { x: 20,  y: 30,  w: 130, h: 50 },
  intel:      { x: 20,  y: 105, w: 130, h: 50 },
  comms:      { x: 20,  y: 180, w: 130, h: 50 },
  field:      { x: 200, y: 30,  w: 130, h: 50 },
  strategist: { x: 200, y: 105, w: 130, h: 50 },
  operator:   { x: 110, y: 270, w: 150, h: 55 },
  analyst:    { x: 380, y: 30,  w: 110, h: 42 },
  recon:      { x: 380, y: 85,  w: 110, h: 42 },
  sergeant:   { x: 380, y: 140, w: 110, h: 42 },
}

// Edges per stream type - only highlight relevant paths
const STREAM_EDGES = {
  content: [['scout','intel'],['intel','comms'],['comms','operator']],
  community: [['field','operator']],
  prospect: [['strategist','operator']],
}
const ALL_EDGES = [
  ['scout','intel'],['intel','comms'],['comms','operator'],
  ['field','operator'],['strategist','operator'],
  ['operator','analyst'],['operator','recon'],['operator','sergeant'],
]

// Which nodes are active per stream
const STREAM_NODES = {
  content: ['scout','intel','comms','operator'],
  community: ['field','operator'],
  prospect: ['strategist','operator'],
}

function AgentNode({id,active,done,selected,onClick}){
  const ag=agentMap[id]; if(!ag) return null
  const pos=NODE_LAYOUT[id]
  const isOp=id==='operator'
  return(
    <g onClick={()=>onClick(id)} className="cursor-pointer">
      <rect x={pos.x} y={pos.y} width={pos.w} height={pos.h} rx={isOp?12:8}
        fill={active?ag.color+'18':selected?ag.color+'10':'white'}
        stroke={active?ag.color:selected?ag.color:done?'#10B981':'#D1D5DB'}
        strokeWidth={active||selected?2:1}
        className="transition-all duration-300"
      />
      {active&&<rect x={pos.x} y={pos.y} width={pos.w} height={pos.h} rx={isOp?12:8}
        fill="none" stroke={ag.color} strokeWidth={2} opacity={0.4}>
        <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.5s" repeatCount="indefinite"/>
      </rect>}
      <text x={pos.x+28} y={pos.y+pos.h/2-5} fontSize="10" fontWeight="700" fill={ag.color} fontFamily="DM Sans" clipPath={`url(#clip-${id})`}>{ag.name}</text>
      <text x={pos.x+28} y={pos.y+pos.h/2+8} fontSize="7" fill="#94A3B8" fontFamily="DM Sans" clipPath={`url(#clip-${id})`}>{ag.role.length>18?ag.role.slice(0,18)+'...':ag.role}</text>
      <text x={pos.x+8} y={pos.y+pos.h/2+4} fontSize="13">{ag.emoji}</text>
      <clipPath id={`clip-${id}`}><rect x={pos.x+25} y={pos.y} width={pos.w-35} height={pos.h}/></clipPath>
      {done&&!active&&<circle cx={pos.x+pos.w-10} cy={pos.y+10} r={6} fill="#10B981"/>}
      {done&&!active&&<text x={pos.x+pos.w-10} y={pos.y+10+3} fontSize="8" fill="white" textAnchor="middle">✓</text>}
      {active&&<circle cx={pos.x+pos.w-10} cy={pos.y+10} r={4} fill={ag.color}><animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite"/></circle>}
    </g>
  )
}

function FlowEdge({from,to,active}){
  const f=NODE_LAYOUT[from],t=NODE_LAYOUT[to]
  if(!f||!t)return null
  const x1=f.x+f.w/2, y1=f.y+f.h
  const x2=t.x+t.w/2, y2=t.y
  // Curved path
  const midY=(y1+y2)/2
  const d=`M${x1},${y1} C${x1},${midY} ${x2},${midY} ${x2},${y2}`
  return(<>
    <path d={d} fill="none" stroke={active?'#1B4D3E':'#E2E8F0'} strokeWidth={active?1.5:1} className="transition-all duration-500"/>
    {active&&<circle r="2.5" fill="#1B4D3E"><animateMotion dur="1.5s" repeatCount="indefinite"><mpath xlinkHref={`#edge-${from}-${to}`}/></animateMotion></circle>}
    <path id={`edge-${from}-${to}`} d={d} fill="none" stroke="none"/>
  </>)
}

function MissionDetail({m}){
  const[selectedNode,setSelectedNode]=useState(null)
  const[activeKey,setActiveKey]=useState(null)
  const[playing,setPlaying]=useState(false)
  const[keysDone,setKeysDone]=useState(new Set())
  const[expanded,setExpanded]=useState(null)
  const timerRef=React.useRef(null)
  const prevMissionId=React.useRef(null)

  // Build playback sequence based on mission stream
  const getPlaySeq=()=>{
    if(!m)return[]
    const seq=[]
    if(m.stream==='content') seq.push('scout','intel','comms')
    if(m.stream==='community') seq.push('field')
    if(m.stream==='prospect') seq.push('strategist')
    seq.push('operator')
    if(m.analystInsights) seq.push('analyst')
    if(m.competitorContext) seq.push('recon')
    if(m.activationData) seq.push('sergeant')
    return seq
  }
  const playSeq=getPlaySeq()
  const[playIdx,setPlayIdx]=useState(-1)

  // Nodes relevant to this mission's stream
  const relevantNodes=m?[...(STREAM_NODES[m.stream]||[]),...(m.analystInsights?['analyst']:[]),...(m.competitorContext?['recon']:[]),...(m.activationData?['sergeant']:[])]:[]

  React.useEffect(()=>{
    if(!m)return
    if(prevMissionId.current!==m.id){
      prevMissionId.current=m.id
      if(timerRef.current)clearTimeout(timerRef.current)
      setKeysDone(new Set());setActiveKey(null);setPlayIdx(0);setPlaying(true)
      setSelectedNode(playSeq[0]||null)
    }
  },[m?.id])

  React.useEffect(()=>{
    if(!playing||playIdx<0||playIdx>=playSeq.length)return
    const cur=playSeq[playIdx]
    setActiveKey(cur);setSelectedNode(cur)
    const delays={scout:2000,intel:3500,comms:2000,field:2500,strategist:2500,operator:3000,analyst:1500,recon:1500,sergeant:1500}
    timerRef.current=setTimeout(()=>{
      setKeysDone(p=>{const n=new Set(p);n.add(cur);return n})
      if(playIdx<playSeq.length-1){setPlayIdx(playIdx+1)}else{setPlaying(false);setActiveKey(null)}
    },delays[cur]||2000)
    return()=>{if(timerRef.current)clearTimeout(timerRef.current)}
  },[playIdx,playing])

  const resetMission=()=>{setPlaying(false);setPlayIdx(-1);setActiveKey(null);setKeysDone(new Set());if(timerRef.current)clearTimeout(timerRef.current)}
  const replayMission=()=>{if(timerRef.current)clearTimeout(timerRef.current);setKeysDone(new Set());setActiveKey(null);setPlayIdx(0);setPlaying(true);setSelectedNode(playSeq[0])}
  const skipStage=()=>{
    const cur=playSeq[playIdx];setKeysDone(p=>{const n=new Set(p);n.add(cur);return n})
    if(playIdx<playSeq.length-1){setPlayIdx(playIdx+1)}else{setPlaying(false);setActiveKey(null)}
  }

  if(!m)return<div className="flex-1 flex items-center justify-center text-gray-300"><img src="/logo.png" alt="" className="h-16 opacity-20 logo-img"/></div>

  const imp=m.impact
  const isAct=(k)=>activeKey===k
  const isDone=(k)=>keysDone.has(k)
  const isRelevant=(k)=>relevantNodes.includes(k)
  const streamEdges=STREAM_EDGES[m.stream]||[]

  // Which edges should glow
  const isEdgeActive=(f,t)=>{
    const inStream=streamEdges.some(([a,b])=>a===f&&b===t)
    const postMission=(f==='operator'&&['analyst','recon','sergeant'].includes(t))
    return(inStream||postMission)&&(isDone(f)||isAct(f))
  }

  // Detail panel for selected node
  const renderDetail=()=>{
    if(!selectedNode)return null
    const ag=agentMap[selectedNode]; const active=isAct(selectedNode)
    return(<div className="space-y-2.5">
      {selectedNode==='scout'&&m.detect&&<div className="bg-gray-50 rounded-xl p-3 border border-gray-100"><div className="flex flex-wrap gap-1 mb-2">{m.detect.scanSources.map((s,i)=><span key={i} className="text-[7px] bg-[#1B4D3E]/10 text-[#1B4D3E] px-1.5 py-0.5 rounded font-semibold">{s}</span>)}</div><p className="text-[11px] text-gray-600 leading-relaxed">{active?<TypeWriter text={m.detect.summary} speed={12}/>:m.detect.summary}</p>{m.detect.aiTools&&<div className="mt-1.5 text-[9px]"><span className="text-gray-400">AI tools: </span><span className="text-red-600 font-semibold">{m.detect.aiTools.join(', ')}</span></div>}<FeedbackBar/></div>}
      {selectedNode==='intel'&&m.create&&m.create.map((c,i)=><div key={i} className={`cursor-pointer ${active?'animate-fadeIn':''}`} style={{animationDelay:i*400+'ms'}} onClick={()=>{if(c.xPost)setExpanded(<XPost x={c.xPost}/>);if(c.tiktok)setExpanded(<TikTokPost t={c.tiktok}/>)}}>
        {c.xPost&&<XPost x={c.xPost}/>}{c.tiktok&&<TikTokPost t={c.tiktok}/>}
        {c.redditPost&&<div className="bg-white border border-gray-200 rounded-xl p-2.5 shadow-sm flex"><div className="bg-[#FF4500]/10 px-1.5 py-1.5 flex flex-col items-center border-r border-gray-100 min-w-[30px]"><svg className="w-4 h-4 mb-1" viewBox="0 0 24 24" fill="#FF4500"><circle cx="12" cy="12" r="12"/><path d="M19.1 12a1.5 1.5 0 00-2.5-1.1 7.4 7.4 0 00-4-1.2l.7-3.2 2.2.5a1.1 1.1 0 102.1 0 1.1 1.1 0 00-2-.6l-2.5-.5a.3.3 0 00-.4.3l-.8 3.6a7.4 7.4 0 00-4.1 1.2 1.5 1.5 0 10-1.6 2.5 2.8 2.8 0 000 .5c0 2.5 2.9 4.5 6.5 4.5s6.5-2 6.5-4.5a2.8 2.8 0 000-.5 1.5 1.5 0 00.8-1.5zM8.5 13.1a1.1 1.1 0 111.1 1.1 1.1 1.1 0 01-1.1-1.1zm6.2 2.9a4.2 4.2 0 01-5.3 0 .3.3 0 01.4-.4 3.6 3.6 0 004.5 0 .3.3 0 01.4.4zm-.4-1.8a1.1 1.1 0 111.1-1.1 1.1 1.1 0 01-1.1 1.1z" fill="white"/></svg><span className="text-xs font-bold text-[#FF4500]">{active?<CountUp target={c.redditPost.score} duration={1500}/>:c.redditPost.score}</span></div><div className="p-1.5 flex-1"><div className="text-[8px] text-gray-500"><b>{c.redditPost.subreddit}</b>{c.redditPost.hot&&<span className="ml-1">&#128293;</span>}</div><div className="text-[10px] font-medium text-gray-900">{c.redditPost.title}</div></div></div>}
        {!c.xPost&&!c.tiktok&&!c.redditPost&&<div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm"><div className="flex items-center gap-2">{c.type==='blog'&&<span className="text-[12px]">&#128221;</span>}{c.type==='seo-page'&&<span className="text-[12px]">&#127760;</span>}{c.type==='youtube-short'&&<svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.3 31.3 0 000 12a31.3 31.3 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.3 31.3 0 0024 12a31.3 31.3 0 00-.5-5.8zM9.5 15.6V8.4l6.3 3.6z"/></svg>}<span className="text-[7px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-900/30 text-amber-700">{c.type.replace(/-/g,' ')}</span><span className="text-[10px] font-semibold text-gray-900">{c.title}</span></div>{c.preview&&<p className="text-[9px] text-gray-500 mt-1">{active?<TypeWriter text={c.preview} speed={10}/>:c.preview}</p>}<div className="flex gap-2 mt-1 text-[7px] text-gray-400">{c.words&&<span>{c.words}w</span>}{c.seoScore&&<span>SEO {c.seoScore}</span>}{c.conversionRate&&<span className="text-[#1B4D3E]">Conv {c.conversionRate}</span>}{c.visits&&<span>{c.visits} visits</span>}</div><FeedbackBar/></div>}
      </div>)}
      {selectedNode==='comms'&&m.distribute&&m.distribute.map((d,i)=><div key={i} className={`bg-white rounded-lg p-2.5 border border-gray-200 shadow-sm ${active?'animate-fadeIn':''}`} style={{animationDelay:i*200+'ms'}}><div className="flex items-center justify-between"><span className="text-[10px] font-semibold text-gray-800">{d.channel}</span><span className="text-base font-mono font-bold" style={{color:d.color}}>{active?<CountUp target={d.metric} duration={1200}/>:d.metric}</span></div><div className="text-[8px] text-gray-500">{d.metricLabel} &bull; {d.detail}</div><FeedbackBar/></div>)}
      {selectedNode==='field'&&m.engage&&m.engage.map((e,i)=><div key={i} className={`bg-white rounded-xl p-2.5 border border-gray-200 shadow-sm ${active?'animate-fadeIn':''}`}><div className="flex items-center gap-1.5 mb-1"><span className="text-[7px] font-bold bg-orange-100 dark:bg-orange-900/30 text-orange-700 px-1.5 py-0.5 rounded">{e.platform}</span><span className="text-[8px] text-gray-400 ml-auto">{active?<CountUp target={e.reactions} duration={800}/>:e.reactions} reactions</span></div><p className="text-[10px] text-gray-700">{active?<TypeWriter text={e.text} speed={18}/>:e.text}</p><FeedbackBar/></div>)}
      {selectedNode==='field'&&m.engageOutput&&<div className="mt-1 p-2 rounded-lg bg-[#EA580C]/5 border border-[#EA580C]/20"><div className="text-[8px] text-[#EA580C] font-semibold">{m.engageOutput.signals} signals to Operator</div><div className="text-[8px] text-gray-600 mt-0.5">{m.engageOutput.topSignal}</div></div>}
      {selectedNode==='strategist'&&m.qualify&&m.qualify.map((l,i)=><div key={i} className={`${active?'animate-fadeIn':''}`}><LeadCard l={l}/></div>)}
      {selectedNode==='strategist'&&m.qualifyOutput&&<div className="mt-1.5 p-2 rounded-lg bg-[#7C3AED]/5 border border-[#7C3AED]/20"><div className="text-[8px] text-[#7C3AED] font-semibold">{m.qualifyOutput.leadsScored} leads scored</div><div className="flex flex-wrap gap-1 mt-1">{m.qualifyOutput.sources.map((s,i)=><span key={i} className="text-[6px] bg-[#7C3AED]/10 text-[#7C3AED] px-1 py-0.5 rounded">{s}</span>)}</div></div>}
      {selectedNode==='operator'&&m.convert&&m.convert.map((c,i)=><div key={i} className={`${active?'animate-fadeIn':''}`}><EmailUI c={c}/></div>)}
      {selectedNode==='analyst'&&m.analystInsights&&<div className="bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 rounded-xl p-3">{m.analystInsights.map((ins,i)=><div key={i} className="flex items-start gap-2 text-[9px] text-gray-700 dark:text-gray-300 mb-1.5"><Brain size={9} className="text-[#0891B2] mt-0.5 flex-shrink-0"/><span>{active?<TypeWriter text={ins} speed={15}/>:ins}</span></div>)}</div>}
      {selectedNode==='recon'&&m.competitorContext&&<div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-xl p-3"><p className="text-[9px] text-gray-600 dark:text-gray-400">{active?<TypeWriter text={m.competitorContext} speed={15}/>:m.competitorContext}</p></div>}
      {selectedNode==='sergeant'&&m.activationData&&<div className="bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-xl p-3"><div className="grid grid-cols-4 gap-2 text-center">{Object.entries(m.activationData).map(([k,v])=><div key={k}><div className="text-sm font-mono font-bold text-[#0D9488]">{active?<CountUp target={v} duration={1200}/>:v}</div><div className="text-[6px] text-gray-500 dark:text-gray-400 uppercase">{k.replace(/([A-Z])/g,' $1')}</div></div>)}</div></div>}
      {!['scout','intel','comms','field','strategist','operator','analyst','recon','sergeant'].includes(selectedNode)&&<div className="text-gray-400 text-sm">Select a node to view details</div>}
    </div>)
  }

  return(<>
    {expanded&&<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-8" onClick={()=>setExpanded(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6" onClick={e=>e.stopPropagation()}><button onClick={()=>setExpanded(null)} className="float-right p-1 hover:bg-gray-100 rounded-lg"><X size={16}/></button>{expanded}</div></div>}
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* HEADER */}
      <div className="bg-white px-5 py-2 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-base">{m.icon}</span>
          <span className="text-[7px] font-bold uppercase px-1.5 py-0.5 rounded" style={{background:m.color+'15',color:m.color}}>{m.stream}</span>
          {m.source&&<span className="text-[7px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded">{m.source}</span>}
          {m.audience&&m.audience.map(a=><span key={a} className={`text-[6px] font-bold uppercase px-1 py-0.5 rounded ${a==='dev'?'bg-[#1B4D3E]/10 text-[#1B4D3E]':'bg-[#7C3AED]/10 text-[#7C3AED]'}`}>{a}</span>)}
          {m.detect&&<SevBadge s={m.detect.severity} cvss={m.detect.cvss}/>}
          <span className="text-[9px] text-gray-400 font-mono ml-auto">{m.date}</span>
        </div>
        <div className="flex items-center gap-3">
          <div><h2 className="text-[13px] font-bold text-gray-900">{m.title}</h2><div className="text-[9px] text-gray-400">{m.subtitle}</div></div>
          <div className="flex gap-1 ml-auto flex-shrink-0">
            {playing&&<button onClick={skipStage} className="px-2 py-0.5 rounded bg-[#1B4D3E]/10 text-[#1B4D3E] text-[8px] font-semibold"><ChevronRight size={8} className="inline"/> Skip</button>}
            {playing&&<button onClick={resetMission} className="px-2 py-0.5 rounded bg-gray-100 text-gray-500 text-[8px] font-semibold">Show all</button>}
            {!playing&&<button onClick={replayMission} className="px-2 py-0.5 rounded bg-[#1B4D3E] text-white text-[8px] font-semibold"><RefreshCw size={7} className="inline"/> Replay</button>}
          </div>
        </div>
        {/* Stats strip */}
        <div className="flex gap-1 mt-1 overflow-x-auto">
          {[['Impressions',imp.impressions,'#1B4D3E'],['Pipeline',imp.pipeline,'#059669'],['Installs',imp.installs,'#7C3AED'],['CAC',imp.cac,'#1B4D3E'],['Conv',imp.conversionRate,'#059669']].map(([l,v,c])=><div key={l} className="bg-gray-50 rounded px-1.5 py-0.5 flex-shrink-0"><span className="text-[5px] text-gray-400 uppercase">{l} </span><span className="text-[9px] font-mono font-bold" style={{color:c}}>{v||'--'}</span></div>)}
        </div>
      </div>

      {/* MAIN: Graph + Detail */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT: Node graph */}
        <div className="w-[600px] flex-shrink-0 border-r border-gray-200 bg-gray-50 dark:bg-gray-900/30 p-3 overflow-y-auto">
          <svg viewBox="0 0 510 340" className="w-full">
            {/* Section labels */}
            <text x="85" y="22" fontSize="7" fill="#1B4D3E" fontWeight="700" textAnchor="middle" fontFamily="DM Sans" opacity={m.stream==='content'?1:0.3}>CONTENT PIPELINE</text>
            <text x="265" y="22" fontSize="7" fill="#EA580C" fontWeight="700" textAnchor="middle" fontFamily="DM Sans" opacity={m.stream==='community'?1:0.3}>COMMUNITY</text>
            <text x="265" y="97" fontSize="7" fill="#7C3AED" fontWeight="700" textAnchor="middle" fontFamily="DM Sans" opacity={m.stream==='prospect'?1:0.3}>PROSPECT</text>
            <text x="185" y="262" fontSize="7" fill="#059669" fontWeight="700" textAnchor="middle" fontFamily="DM Sans">OPERATOR</text>
            <text x="435" y="22" fontSize="7" fill="#94A3B8" fontWeight="700" textAnchor="middle" fontFamily="DM Sans">POST-MISSION</text>

            {/* All edges - dim ones not in this stream */}
            {ALL_EDGES.map(([f,t])=><FlowEdge key={`${f}-${t}`} from={f} to={t} active={isEdgeActive(f,t)}/>)}

            {/* All nodes - dim ones not in this stream */}
            {Object.keys(NODE_LAYOUT).map(id=>{
              const hasData=id==='operator'||isRelevant(id)||(id==='analyst'&&m.analystInsights)||(id==='recon'&&m.competitorContext)||(id==='sergeant'&&m.activationData)
              const dimmed=!isRelevant(id)&&!['analyst','recon','sergeant'].includes(id)
              return<g key={id} opacity={dimmed?0.25:1}><AgentNode id={id} active={isAct(id)} done={isDone(id)} selected={selectedNode===id} onClick={setSelectedNode}/></g>
            })}
          </svg>
        </div>

        {/* RIGHT: Selected node detail */}
        <div className="flex-1 overflow-y-auto p-4">
          {selectedNode&&agentMap[selectedNode]?<>
            <div className="flex items-center gap-2 mb-3">
              <AgentAvatar id={selectedNode} size="md"/>
              <div><div className="text-sm font-bold" style={{color:agentMap[selectedNode]?.color}}>{agentMap[selectedNode]?.name}</div><div className="text-[9px] text-gray-400">{agentMap[selectedNode]?.role}</div></div>
              {isAct(selectedNode)&&<span className="ml-auto flex items-center gap-1"><span className="w-2 h-2 rounded-full animate-pulse" style={{background:agentMap[selectedNode]?.color}}/><span className="text-[8px] font-mono" style={{color:agentMap[selectedNode]?.color}}>PROCESSING</span></span>}
              {isDone(selectedNode)&&!isAct(selectedNode)&&<span className="ml-auto text-[8px] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 px-2 py-0.5 rounded font-bold"><Check size={8} className="inline mr-0.5"/>COMPLETE</span>}
            </div>
            {renderDetail()}
          </>:<div className="flex items-center justify-center h-full text-gray-300 text-sm">Click a node to view details</div>}
        </div>
      </div>
    </div>
  </>)
}


// ===== IMPACT SIDEBAR =====
function ImpactSidebar({m}){
  if(!m)return<div className="w-56 bg-gray-50"/>
  const imp=m.impact
  return(<div className="w-56 bg-gray-50 border-l border-gray-100 overflow-y-auto flex-shrink-0">
    <div className="p-3 border-b border-gray-200"><div className="text-[8px] text-[#1B4D3E] uppercase tracking-widest font-bold mb-2">Mission impact</div>
      <div className="space-y-1.5">{[['Impressions',imp.impressions,'#1B4D3E'],['Engagements',imp.engagements,'#EA580C'],['Conversions',imp.conversions,'#0891B2'],['Pipeline',imp.pipeline,'#059669'],['Installs',imp.installs,'#7C3AED'],['CAC',imp.cac,'#1B4D3E'],['Conv rate',imp.conversionRate,'#059669'],['Reply rate',imp.responseRate,'#D97706'],['Time to lead',imp.timeToLead,'#0891B2']].map(([l,v,c])=><div key={l} className="bg-white rounded-md p-2 border border-gray-100"><div className="text-[7px] text-gray-400 uppercase tracking-wider">{l}</div><div className="text-sm font-mono font-bold" style={{color:c}}>{v||'--'}</div></div>)}</div>
    </div>
    <div className="p-3 border-b border-gray-200"><div className="text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Agents involved</div>
      <div className="flex flex-wrap gap-1">{STAGES.filter(({key})=>key==='detect'||(m[key]&&m[key].length>0)).map(({agent})=><AgentAvatar key={agent} id={agent} size="sm"/>)}{m.analystInsights&&<AgentAvatar id="analyst" size="sm"/>}{m.competitorContext&&<AgentAvatar id="recon" size="sm"/>}{m.activationData&&<AgentAvatar id="sergeant" size="sm"/>}</div>
    </div>
    <div className="p-3"><div className="text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Content ({m.create.length})</div>
      {m.create.map((c,i)=><div key={i} className="flex items-center gap-1.5 text-[9px] mb-1"><div className={`w-1.5 h-1.5 rounded-full ${c.status==='published'?'bg-[#1B4D3E]':'bg-amber-500'}`}/><span className="text-gray-600 truncate">{c.title}</span></div>)}
    </div>
  </div>)
}

// ===== AGENT MESSAGE BUS =====
function MessageBus({initialFilter}){
  const[filter,setFilter]=useState(initialFilter||'all')
  const filtered=filter==='all'?messages:messages.filter(m=>m.from===filter||m.to===filter)
  const typeColors={TRIGGER:'#EF4444',ARTIFACT:'#D97706',SIGNAL:'#0891B2',FEEDBACK:'#059669',ESCALATION:'#7C3AED',REQUEST:'#EA580C',APPROVAL:'#1B4D3E',LEARNING:'#0D9488'}
  return(<div className="flex-1 overflow-y-auto p-6">
    <div className="mb-4"><h1 className="text-xl font-bold text-gray-900">Agent message bus</h1><p className="text-sm text-gray-500">14 Mar 2026 &bull; Real-time inter-agent communication</p></div>
    <div className="flex flex-wrap gap-1.5 mb-4">
      <button onClick={()=>setFilter('all')} className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold ${filter==='all'?'bg-gray-800 text-white':'bg-gray-100 text-gray-500'}`}>All</button>
      {agents.filter(a=>messages.some(m=>m.from===a.id||m.to===a.id)).map(a=><button key={a.id} onClick={()=>setFilter(a.id)} className={`px-2.5 py-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-1.5 ${filter===a.id?'text-white':'bg-gray-100 text-gray-500'}`} style={filter===a.id?{background:a.color}:{}}><span>{a.emoji}</span>{a.name}</button>)}
    </div>
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-50">
      {filtered.map(m=>{
        const from=agentMap[m.from]||{emoji:'👤',name:m.from==='commander'?'Commander':m.from,color:'#1B4D3E'}
        const to=agentMap[m.to]||{emoji:'👤',name:m.to==='commander'?'Commander':m.to,color:'#1B4D3E'}
        return(<div key={m.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[9px] text-gray-400 font-mono w-16 flex-shrink-0">{m.date} {m.time}</span>
            <span className="px-1.5 py-0.5 rounded text-[7px] font-bold text-white" style={{background:typeColors[m.type]||'#6B7280'}}>{m.type}</span>
            {m.priority==='critical'&&<span className="text-[7px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">CRITICAL</span>}
            {m.priority==='urgent'&&<span className="text-[7px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">URGENT</span>}
            {m.mission&&<span className="text-[8px] text-gray-400 ml-auto font-mono">{m.mission}</span>}
          </div>
          <div className="flex items-center gap-2 mb-1.5">
            <AgentAvatar id={m.from} size="sm"/>
            <span className="text-[10px] font-semibold" style={{color:from.color}}>{from.name}</span>
            <ArrowRight size={12} className="text-gray-300"/>
            {m.to==='commander'?<div className="w-6 h-6 rounded-lg bg-[#1B4D3E] flex items-center justify-center text-white text-[9px] font-bold">MC</div>:<AgentAvatar id={m.to} size="sm"/>}
            <span className="text-[10px] font-semibold" style={{color:to.color}}>{to.name}</span>
          </div>
          <p className="text-[11px] text-gray-600 leading-relaxed ml-8">{m.text}</p>
        </div>)
      })}
    </div>
  </div>)
}

// ===== AGENT ROSTER VIEW =====
function AgentRoster(){
  return(<div className="flex-1 overflow-y-auto p-6">
    <div className="mb-4"><h1 className="text-xl font-bold text-gray-900">Agent roster</h1><p className="text-sm text-gray-500">10 agents &bull; Their roles, relationships, and data sources</p></div>
    <div className="grid grid-cols-2 gap-4">{agents.map(a=>(
      <div key={a.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:border-gray-300 transition-colors">
        <div className="flex items-center gap-3 mb-3">
          <AgentAvatar id={a.id} size="lg"/>
          <div><div className="font-bold text-sm text-gray-900">{a.name}</div><div className="text-[10px] font-medium" style={{color:a.color}}>{a.role}</div></div>
        </div>
        <p className="text-[11px] text-gray-600 leading-relaxed mb-3">{a.desc}</p>
        <div className="space-y-2">
          <div><div className="text-[8px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Receives from</div>
            <div className="flex flex-wrap gap-1">{a.receives.filter(r=>r!=='external').map(r=><span key={r} className="flex items-center gap-1 text-[9px] bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded"><span>{agentMap[r]?.emoji||'📥'}</span>{agentMap[r]?.name||r}</span>)}{a.receives.includes('external')&&<span className="text-[9px] bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded">📥 External feeds</span>}</div>
          </div>
          <div><div className="text-[8px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Sends to</div>
            <div className="flex flex-wrap gap-1">{a.sends.filter(s=>s!=='commander').map(s=><span key={s} className="flex items-center gap-1 text-[9px] bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded"><span>{agentMap[s]?.emoji||'📤'}</span>{agentMap[s]?.name||s}</span>)}{a.sends.includes('commander')&&<span className="text-[9px] bg-[#1B4D3E]/10 border border-[#1B4D3E]/20 text-[#1B4D3E] px-1.5 py-0.5 rounded font-semibold">👤 Commander</span>}</div>
          </div>
        </div>
      </div>
    ))}</div>
  </div>)
}

// ===== DASHBOARD =====
const weeklyData=[{day:'Mon',dev:34,vibe:18,content:6},{day:'Tue',dev:52,vibe:24,content:8},{day:'Wed',dev:41,vibe:32,content:5},{day:'Thu',dev:67,vibe:28,content:10},{day:'Fri',dev:71,vibe:38,content:9},{day:'Sat',dev:23,vibe:12,content:3},{day:'Sun',dev:24,vibe:15,content:7}]
const funnelData=[{stage:'Impressions',value:230000},{stage:'Clicks',value:8400},{stage:'Enlist visits',value:2100},{stage:'Installs',value:270},{stage:'Paid',value:34}]
const channelPie=[{name:'Twitter/X',value:35,color:'#1B4D3E'},{name:'TikTok',value:25,color:'#7C3AED'},{name:'Reddit',value:20,color:'#FF4500'},{name:'HN',value:12,color:'#FF6600'},{name:'Other',value:8,color:'#94A3B8'}]
const agentMsgCounts=agents.map(a=>({name:a.emoji,agent:a.name,msgs:messages.filter(m=>m.from===a.id||m.to===a.id).length,color:a.color}))

function DashboardView({setTab,setAgentFilter}){
  const d=dashboardStats
  const onAgentClick=(agId)=>{setAgentFilter(agId);setTab('bus')}
  return(<div className="flex-1 overflow-y-auto p-6">
    <div className="mb-5"><h1 className="text-xl font-bold text-gray-900">Dashboard</h1><p className="text-sm text-gray-500">14 March 2026 &bull; 10 agents active</p></div>

    {/* Top stats */}
    <div className="grid grid-cols-5 gap-3 mb-4">{[['Vulns detected',d.total.vulns,'#EF4444'],['Content created',d.total.content,'#D97706'],['Engagements',d.total.engagements,'#EA580C'],['Pipeline value',d.total.pipeline,'#059669'],['Installs',d.total.installs,'#7C3AED']].map(([l,v,c])=><div key={l} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm"><div className="text-[8px] text-gray-400 uppercase tracking-wider">{l}</div><div className="text-xl font-mono font-bold mt-0.5" style={{color:c}}>{v}</div></div>)}</div>
    <div className="grid grid-cols-5 gap-3 mb-5">{[['Blended CAC',d.total.blendedCac,'#1B4D3E'],['Organic rate',d.total.organic,'#059669'],['Leads qualified',d.total.leads,'#7C3AED'],['Pending review',d.total.pending,'#D97706'],['Active missions',d.total.missions,'#0891B2']].map(([l,v,c])=><div key={l} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm"><div className="text-[8px] text-gray-400 uppercase tracking-wider">{l}</div><div className="text-lg font-mono font-bold mt-0.5" style={{color:c}}>{v}</div></div>)}</div>

    {/* Charts row */}
    <div className="grid grid-cols-3 gap-4 mb-5">
      {/* Installs over time */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-3">Installs this week (dev vs vibe)</div>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={weeklyData}>
            <defs>
              <linearGradient id="gDev" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1B4D3E" stopOpacity={0.3}/><stop offset="100%" stopColor="#1B4D3E" stopOpacity={0}/></linearGradient>
              <linearGradient id="gVibe" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7C3AED" stopOpacity={0.3}/><stop offset="100%" stopColor="#7C3AED" stopOpacity={0}/></linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{fill:'#94A3B8',fontSize:9}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:'#94A3B8',fontSize:9}} axisLine={false} tickLine={false} width={25}/>
            <Tooltip contentStyle={{background:'#fff',border:'1px solid #E2E8F0',borderRadius:8,fontSize:11,boxShadow:'0 4px 12px rgba(0,0,0,0.08)'}}/>
            <Area type="monotone" dataKey="dev" stroke="#1B4D3E" fill="url(#gDev)" strokeWidth={2} name="Dev"/>
            <Area type="monotone" dataKey="vibe" stroke="#7C3AED" fill="url(#gVibe)" strokeWidth={2} name="Vibe"/>
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-1 justify-center">{[['Dev','#1B4D3E'],['Vibe','#7C3AED']].map(([l,c])=><div key={l} className="flex items-center gap-1.5 text-[9px] text-gray-500"><div className="w-2 h-2 rounded-full" style={{background:c}}/>{l}</div>)}</div>
      </div>

      {/* Channel distribution pie */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-3">Engagement by channel</div>
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie data={channelPie} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" stroke="none">
              {channelPie.map((e,i)=><Cell key={i} fill={e.color}/>)}
            </Pie>
            <Tooltip contentStyle={{background:'#fff',border:'1px solid #E2E8F0',borderRadius:8,fontSize:11}}/>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center mt-1">{channelPie.map(c=><div key={c.name} className="flex items-center gap-1 text-[9px] text-gray-500"><div className="w-2 h-2 rounded-full" style={{background:c.color}}/>{c.name} {c.value}%</div>)}</div>
      </div>

      {/* Content production bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-3">Content produced this week</div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={weeklyData}>
            <XAxis dataKey="day" tick={{fill:'#94A3B8',fontSize:9}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:'#94A3B8',fontSize:9}} axisLine={false} tickLine={false} width={20}/>
            <Tooltip contentStyle={{background:'#fff',border:'1px solid #E2E8F0',borderRadius:8,fontSize:11}}/>
            <Bar dataKey="content" fill="#D97706" radius={[4,4,0,0]} name="Pieces"/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Funnel + Dev/Vibe comparison */}
    <div className="grid grid-cols-3 gap-4 mb-5">
      {/* Conversion funnel */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-3">Conversion funnel</div>
        <div className="space-y-1.5">{funnelData.map((f,i)=>{const pct=i===0?100:Math.round(f.value/funnelData[0].value*10000)/100;const barW=Math.max(pct,2);return(
          <div key={f.stage} className="flex items-center gap-2">
            <span className="text-[9px] text-gray-500 w-20 text-right flex-shrink-0">{f.stage}</span>
            <div className="flex-1 h-5 bg-gray-50 rounded overflow-hidden"><div className="h-full rounded flex items-center justify-end pr-1.5 transition-all" style={{width:`${barW}%`,background:i<2?'#1B4D3E':i<4?'#059669':'#00E5A0'}}><span className="text-[8px] text-white font-mono font-bold">{f.value>=1000?(f.value/1000).toFixed(0)+'K':f.value}</span></div></div>
          </div>
        )})}</div>
        <div className="mt-2 pt-2 border-t border-gray-100 text-[9px] text-gray-500 text-center">Overall conversion: <span className="font-bold text-[#1B4D3E]">{(funnelData[4].value/funnelData[2].value*100).toFixed(1)}%</span> enlist-to-paid</div>
      </div>

      {/* Dev engine card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm cursor-pointer hover:border-[#1B4D3E]/30 transition-colors" onClick={()=>setTab('missions')}>
        <div className="flex items-center gap-2 mb-3"><Code size={14} className="text-[#1B4D3E]"/><span className="text-xs font-bold text-[#1B4D3E]">Dev engine</span><ChevronRight size={12} className="text-gray-300 ml-auto"/></div>
        <div className="grid grid-cols-2 gap-3 text-center">{[['Missions',d.dev.missions],['Leads',d.dev.leads],['Pipeline',d.dev.pipeline],['CAC',d.dev.cac],['Installs',d.dev.installs],['Content',d.dev.content]].map(([l,v])=><div key={l}><div className="text-base font-mono font-bold text-[#1B4D3E]">{v}</div><div className="text-[7px] text-gray-400 uppercase">{l}</div></div>)}</div>
        <div className="mt-3 pt-2 border-t border-gray-100 text-[9px] text-gray-500">Channels: Twitter, Reddit, HN, LinkedIn, GitHub</div>
      </div>

      {/* Vibe engine card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm cursor-pointer hover:border-[#7C3AED]/30 transition-colors" onClick={()=>setTab('missions')}>
        <div className="flex items-center gap-2 mb-3"><Smartphone size={14} className="text-[#7C3AED]"/><span className="text-xs font-bold text-[#7C3AED]">Vibe engine</span><ChevronRight size={12} className="text-gray-300 ml-auto"/></div>
        <div className="grid grid-cols-2 gap-3 text-center">{[['Missions',d.vibe.missions],['Leads',d.vibe.leads],['Installs',d.vibe.installs],['CAC',d.vibe.cac],['Content',d.vibe.content],['Engagements','7.2K']].map(([l,v])=><div key={l}><div className="text-base font-mono font-bold text-[#7C3AED]">{v}</div><div className="text-[7px] text-gray-400 uppercase">{l}</div></div>)}</div>
        <div className="mt-3 pt-2 border-t border-gray-100 text-[9px] text-gray-500">Channels: TikTok, YouTube, IG Reels, Discord</div>
      </div>
    </div>

    {/* Active agents - CLICKABLE */}
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm mb-5">
      <div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-3">Active agents <span className="text-gray-300">(click to view messages)</span></div>
      <div className="grid grid-cols-5 gap-2">{agents.map(a=>{
        const msgCount=messages.filter(m=>m.from===a.id||m.to===a.id).length
        return(<div key={a.id} onClick={()=>onAgentClick(a.id)} className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 hover:shadow-sm transition-all border border-transparent hover:border-gray-200 group">
          <AgentAvatar id={a.id} size="sm"/>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-semibold text-gray-800 group-hover:text-gray-900">{a.name}</div>
            <div className="text-[8px] text-gray-500 truncate">{a.role}</div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-[10px] font-mono font-bold" style={{color:a.color}}>{msgCount}</div>
            <div className="text-[7px] text-gray-400">msgs</div>
          </div>
        </div>)
      })}</div>
    </div>

    {/* Agent message volume chart */}
    <div className="grid grid-cols-2 gap-4 mb-5">
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-3">Agent message volume</div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={agentMsgCounts} layout="vertical">
            <XAxis type="number" tick={{fill:'#94A3B8',fontSize:9}} axisLine={false} tickLine={false}/>
            <YAxis type="category" dataKey="name" tick={{fontSize:14}} axisLine={false} tickLine={false} width={25}/>
            <Tooltip contentStyle={{background:'#fff',border:'1px solid #E2E8F0',borderRadius:8,fontSize:11}} formatter={(v,n,p)=>[v+' messages',p.payload.agent]}/>
            <Bar dataKey="msgs" radius={[0,4,4,0]}>{agentMsgCounts.map((e,i)=><Cell key={i} fill={e.color}/>)}</Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent messages */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3"><div className="flex items-center gap-2"><Radio size={14} className="text-[#1B4D3E]"/><span className="text-xs font-bold text-gray-700">Recent messages</span></div><button onClick={()=>setTab('bus')} className="text-[9px] text-[#1B4D3E] hover:underline flex items-center gap-0.5">View all <ChevronRight size={10}/></button></div>
        <div className="divide-y divide-gray-50 max-h-48 overflow-y-auto">{messages.slice(0,6).map(m=>{const from=agentMap[m.from]||{emoji:'👤',name:'Commander',color:'#1B4D3E'};return(<div key={m.id} className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-gray-50 rounded px-1 transition-colors" onClick={()=>{setAgentFilter(m.from);setTab('bus')}}>
          <span className="text-[8px] text-gray-400 font-mono w-10">{m.time}</span>
          <AgentAvatar id={m.from} size="sm"/>
          <ArrowRight size={9} className="text-gray-300"/>
          {m.to==='commander'?<div className="w-5 h-5 rounded-md bg-[#1B4D3E] flex items-center justify-center text-white text-[7px] font-bold">MC</div>:<AgentAvatar id={m.to} size="sm"/>}
          <span className="text-[9px] text-gray-600 flex-1 truncate">{m.text.slice(0,60)}...</span>
        </div>)})}</div>
      </div>
    </div>
  </div>)
}

// ===== 3-COL MISSIONS VIEW =====
function MissionsView({missionList}){
  const[selectedId,setSelectedId]=useState(missionList[0]?.id)
  const[filter,setFilter]=useState('all')
  const filtered=filter==='all'?missionList:missionList.filter(m=>m.stream===filter)
  const selected=missionList.find(m=>m.id===selectedId)||null
  return(<div className="flex flex-1 overflow-hidden">
    <div className="w-64 border-r border-gray-200 bg-white overflow-y-auto flex-shrink-0">
      <div className="px-3 py-2 border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="text-[9px] uppercase tracking-wider font-semibold text-[#1B4D3E] mb-1.5">Missions ({missionList.length})</div>
        <div className="flex gap-1">
          {['all','content','community','prospect'].map(f=><button key={f} onClick={()=>setFilter(f)} className={`px-1.5 py-0.5 rounded text-[7px] font-semibold ${filter===f?'bg-[#1B4D3E] text-white':'bg-gray-100 text-gray-500'}`}>{f==='all'?'All':f.charAt(0).toUpperCase()+f.slice(1)}</button>)}
        </div>
      </div>
      {filtered.map(m=><button key={m.id} onClick={()=>setSelectedId(m.id)} className={`w-full text-left px-3 py-2 border-b border-gray-50 transition-all hover:bg-gray-50 ${selectedId===m.id?'bg-gray-50 border-l-[3px]':'border-l-[3px] border-l-transparent'}`} style={selectedId===m.id?{borderLeftColor:m.color}:{}}>
        <div className="flex items-center gap-1 mb-0.5 flex-wrap">
          <span className="text-sm">{m.icon}</span>
          <span className="text-[6px] font-bold uppercase px-1 py-0.5 rounded" style={{background:m.color+'15',color:m.color}}>{m.stream}</span>
          {m.source&&<span className="text-[6px] font-semibold bg-gray-100 text-gray-500 px-1 py-0.5 rounded">{m.source}</span>}
          {m.audience&&m.audience.map(a=><span key={a} className={`text-[5px] font-bold uppercase px-1 py-0.5 rounded ${a==='dev'?'bg-[#1B4D3E]/10 text-[#1B4D3E]':'bg-[#7C3AED]/10 text-[#7C3AED]'}`}>{a}</span>)}
          {m.detect&&<SevBadge s={m.detect.severity} cvss={m.detect.cvss}/>}
        </div>
        <div className="text-[10px] font-semibold text-gray-900 leading-tight">{m.title}</div>
        <div className="text-[7px] text-gray-400 mt-0.5">{m.subtitle}</div>
        {m.impact.pipeline&&m.impact.pipeline!=='Pending'&&m.impact.pipeline!=='--'&&m.impact.pipeline!=='Scout'&&m.impact.pipeline!=='Scout pipeline'&&<div className="mt-0.5 text-[8px] font-mono font-semibold text-[#059669]">{m.impact.pipeline}</div>}
      </button>)}
    </div>
    <MissionDetail m={selected}/>
  </div>)
}

// ===== AGENT CONFIGURATION =====
function ConfigView(){
  return(<div className="flex-1 overflow-y-auto p-6">
    <div className="mb-5"><h1 className="text-xl font-bold text-gray-900">Agent configuration</h1><p className="text-sm text-gray-500">Add data sources, update keywords, configure each agent's behavior</p></div>
    <div className="space-y-4">{agentConfigs.map(cfg=>{const ag=agentMap[cfg.id];if(!ag)return null;return(
      <div key={cfg.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <AgentAvatar id={cfg.id} size="md"/>
          <div><div className="font-bold text-sm text-gray-900">{ag.name}</div><div className="text-[10px]" style={{color:ag.color}}>{ag.role}</div></div>
          {cfg.lastRun&&<span className="text-[9px] text-gray-400 font-mono ml-auto">Last run: {cfg.lastRun}</span>}
          {cfg.dailyBudget&&<span className="text-[9px] text-gray-400 font-mono ml-auto">Daily budget: {cfg.dailyBudget}</span>}
          {cfg.dailyLimit&&<span className="text-[9px] text-gray-400 font-mono ml-auto">Daily limit: {cfg.dailyLimit} emails</span>}
        </div>
        <div className="space-y-3">
          {cfg.sources&&<div><div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Data sources</div>
            <div className="flex flex-wrap gap-1.5">{cfg.sources.map((s,i)=><span key={i} className="text-[10px] bg-gray-50 text-gray-700 px-2 py-1 rounded-lg border border-gray-200">{s}</span>)}<button className="text-[10px] bg-[#1B4D3E]/10 text-[#1B4D3E] px-2 py-1 rounded-lg border border-[#1B4D3E]/20 hover:bg-[#1B4D3E]/20 transition-colors flex items-center gap-1"><Plus size={10}/>Add source</button></div>
          </div>}
          {cfg.keywords&&<div><div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Monitored keywords</div>
            <div className="flex flex-wrap gap-1.5">{cfg.keywords.map((k,i)=><span key={i} className="text-[10px] bg-orange-50 text-orange-700 px-2 py-1 rounded-lg border border-orange-200 flex items-center gap-1">{k}<button className="text-orange-300 hover:text-orange-600"><X size={9}/></button></span>)}<button className="text-[10px] bg-[#1B4D3E]/10 text-[#1B4D3E] px-2 py-1 rounded-lg border border-[#1B4D3E]/20 hover:bg-[#1B4D3E]/20 flex items-center gap-1"><Plus size={10}/>Add keyword</button></div>
          </div>}
          {cfg.outputTypes&&<div><div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Output types</div>
            <div className="flex flex-wrap gap-1.5">{cfg.outputTypes.map((t,i)=><span key={i} className="text-[10px] bg-amber-50 text-amber-700 px-2 py-1 rounded-lg border border-amber-200">{t}</span>)}</div>
          </div>}
          {cfg.channels&&<div><div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Channels</div>
            <div className="grid grid-cols-2 gap-3"><div><div className="text-[8px] text-[#1B4D3E] font-bold mb-1">DEV CHANNELS</div>{cfg.channels.dev.map((c,i)=><div key={i} className="text-[10px] text-gray-600 mb-0.5">{c}</div>)}<button className="text-[9px] text-[#1B4D3E] mt-1 hover:underline flex items-center gap-0.5"><Plus size={9}/>Add channel</button></div><div><div className="text-[8px] text-purple-600 font-bold mb-1">VIBE CHANNELS</div>{cfg.channels.vibe.map((c,i)=><div key={i} className="text-[10px] text-gray-600 mb-0.5">{c}</div>)}<button className="text-[9px] text-purple-600 mt-1 hover:underline flex items-center gap-0.5"><Plus size={9}/>Add channel</button></div></div>
          </div>}
          {cfg.signals&&<div><div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Signal types</div>
            <div className="flex flex-wrap gap-1.5">{cfg.signals.map((s,i)=><span key={i} className="text-[10px] bg-purple-50 text-purple-700 px-2 py-1 rounded-lg border border-purple-200">{s}</span>)}<button className="text-[10px] bg-[#1B4D3E]/10 text-[#1B4D3E] px-2 py-1 rounded-lg border border-[#1B4D3E]/20 hover:bg-[#1B4D3E]/20 flex items-center gap-1"><Plus size={10}/>Add signal</button></div>
          </div>}
          {cfg.competitors&&<div><div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Monitored competitors</div>
            <div className="flex flex-wrap gap-1.5">{cfg.competitors.map((c,i)=><span key={i} className="text-[10px] bg-gray-100 text-gray-700 px-2 py-1 rounded-lg border border-gray-200 flex items-center gap-1">{c}<button className="text-gray-300 hover:text-gray-600"><X size={9}/></button></span>)}<button className="text-[10px] bg-[#1B4D3E]/10 text-[#1B4D3E] px-2 py-1 rounded-lg border border-[#1B4D3E]/20 hover:bg-[#1B4D3E]/20 flex items-center gap-1"><Plus size={10}/>Add competitor</button></div>
          </div>}
          {cfg.patterns&&<div><div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Active pattern detection</div>
            <div className="flex flex-wrap gap-1.5">{cfg.patterns.map((p,i)=><span key={i} className="text-[10px] bg-cyan-50 text-cyan-700 px-2 py-1 rounded-lg border border-cyan-200">{p}</span>)}</div>
          </div>}
          {cfg.budgetRules&&<div><div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Budget rules</div>
            <div className="space-y-1">{cfg.budgetRules.map((r,i)=><div key={i} className="text-[10px] text-gray-600 flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0"/>{r}</div>)}</div>
          </div>}
          {cfg.sequences&&<div><div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Onboarding sequences</div>
            <div className="grid grid-cols-2 gap-3"><div><div className="text-[8px] text-[#1B4D3E] font-bold mb-1">DEV SEQUENCE</div><div className="text-[10px] text-gray-600">{cfg.sequences.dev}</div></div><div><div className="text-[8px] text-purple-600 font-bold mb-1">VIBE SEQUENCE</div><div className="text-[10px] text-gray-600">{cfg.sequences.vibe}</div></div></div>
          </div>}
          {cfg.templates&&<div><div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Outreach templates</div>
            <div className="grid grid-cols-2 gap-3"><div><div className="text-[8px] text-[#1B4D3E] font-bold mb-1">DEV</div><div className="text-[10px] text-gray-600">{cfg.templates.dev}</div></div><div><div className="text-[8px] text-purple-600 font-bold mb-1">VIBE</div><div className="text-[10px] text-gray-600">{cfg.templates.vibe}</div></div></div>
          </div>}
          <div className="flex gap-2 text-[9px] text-gray-400 pt-2 border-t border-gray-100">
            {cfg.scanFrequency&&<span>Frequency: <span className="text-gray-600">{cfg.scanFrequency}</span></span>}
            {cfg.approvalRequired!==undefined&&<span>Human approval: <span className="font-semibold text-[#1B4D3E]">{cfg.approvalRequired?'Required':'Not required'}</span></span>}
            {cfg.learningCycles&&<span>Learning: <span className="text-gray-600">{cfg.learningCycles}</span></span>}
            {cfg.churnTrigger&&<span>Churn trigger: <span className="text-gray-600">{cfg.churnTrigger}</span></span>}
          </div>
        </div>
      </div>
    )})}</div>
  </div>)
}

// ===== MAIN APP =====
export default function App(){
  const[tab,setTab]=useState('dashboard')
  const[agentFilter,setAgentFilter]=useState('all')
  const[dark,setDark]=useDarkMode()
  const tabs=[
    {id:'dashboard',label:'Dashboard',icon:LayoutDashboard,color:'#1B4D3E'},
    {id:'missions',label:'Missions',icon:Code,color:'#1B4D3E'},
    {id:'bus',label:'Message bus',icon:Radio,color:'#0891B2'},
    {id:'roster',label:'Agent roster',icon:Star,color:'#D97706'},
    {id:'config',label:'Configuration',icon:Settings,color:'#64748B'},
  ]
  return(<div className="h-screen flex flex-col overflow-hidden bg-gray-50">
    <div className="bg-white border-b border-gray-200 px-5 py-2.5 flex items-center gap-4 flex-shrink-0">
      <img src="/logo.png" alt="CodeMarine" className="h-7 logo-img"/>
      <div className="w-px h-5 bg-gray-200"/>
      <span className="text-[9px] text-gray-400 tracking-[3px] uppercase">Control centre</span>
      <div className="ml-6 flex gap-1">{tabs.map(t=><button key={t.id} onClick={()=>{setTab(t.id);if(t.id!=='bus')setAgentFilter('all')}} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${tab===t.id?'text-white':'text-gray-500 hover:bg-gray-50'}`} style={tab===t.id?{background:t.color}:{}}><t.icon size={13}/>{t.label}</button>)}</div>
      <div className="ml-auto flex items-center gap-3">
        <DarkToggle dark={dark} setDark={setDark}/>
        <div className="flex -space-x-1">{agents.slice(0,6).map(a=><div key={a.id} className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] border border-white dark:border-dk-bg" style={{background:a.bg}} title={a.name}>{a.emoji}</div>)}<div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[7px] text-gray-500 font-bold border border-white dark:border-dk-bg">+4</div></div>
        <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#1B4D3E] animate-pulse"/><span className="text-[9px] text-gray-500 font-mono">10 agents</span></div>
      </div>
    </div>
    {tab==='dashboard'&&<DashboardView setTab={setTab} setAgentFilter={setAgentFilter}/>}
    {tab==='missions'&&<MissionsView missionList={allMissions}/>}
    {tab==='bus'&&<MessageBus initialFilter={agentFilter}/>}
    {tab==='roster'&&<AgentRoster/>}
    {tab==='config'&&<ConfigView/>}
  </div>)
}
