// ================================================================
// 10 AGENTS with roles, avatars, colors, and relationships
// ================================================================
export const agents = [
  { id: 'scout', name: 'Scout', role: 'Vulnerability & Signal Monitor', emoji: '🔭', color: '#EF4444', bg: '#FEF2F2',
    desc: 'Continuously scans NVD, GitHub Advisories, npm/PyPI feeds, Product Hunt, and #buildinpublic for threats and opportunities.',
    receives: ['analyst', 'recon'], sends: ['intel', 'analyst'] },
  { id: 'intel', name: 'Intel Officer', role: 'Content Engine', emoji: '🖊️', color: '#D97706', bg: '#FFFBEB',
    desc: 'Transforms intelligence into blog posts, Twitter threads, TikTok scripts, SEO/GEO pages, and email alerts.',
    receives: ['scout', 'field', 'analyst', 'recon'], sends: ['comms', 'analyst'] },
  { id: 'comms', name: 'Comms Officer', role: 'Distribution', emoji: '📡', color: '#1B4D3E', bg: '#ECFDF5',
    desc: 'Deploys content across all channels. One input from Intel becomes 5-7 channel-specific outputs.',
    receives: ['intel', 'campaign'], sends: ['field', 'analyst'] },
  { id: 'field', name: 'Field Agent', role: 'Social Listener & Engagement', emoji: '🎧', color: '#EA580C', bg: '#FFF7ED',
    desc: 'Monitors communities (Reddit, HN, Discord, TikTok) and engages in conversations. Can request content from Intel.',
    receives: ['comms', 'external'], sends: ['intel', 'strategist', 'analyst'] },
  { id: 'strategist', name: 'Strategist', role: 'Prospect Intel & Lead Scoring', emoji: '🎯', color: '#7C3AED', bg: '#F3F0FF',
    desc: 'Qualifies inbound signals into scored leads using Clay, Reo.Dev, Common Room, and GitHub scanning.',
    receives: ['field', 'analyst'], sends: ['operator'] },
  { id: 'operator', name: 'Operator', role: 'AI SDR & Conversion', emoji: '✉️', color: '#059669', bg: '#ECFDF5',
    desc: 'Converts qualified leads with personalised outreach referencing full upstream context chain.',
    receives: ['strategist'], sends: ['sergeant', 'analyst', 'commander'] },
  { id: 'campaign', name: 'Campaign Officer', role: 'Paid Channel Management', emoji: '📣', color: '#2563EB', bg: '#EFF6FF',
    desc: 'Amplifies organic winners with paid spend across Google, LinkedIn, TikTok, Reddit ads. Manages budget allocation.',
    receives: ['analyst', 'comms'], sends: ['comms', 'analyst'] },
  { id: 'analyst', name: 'Analyst', role: 'Pattern Detection & Optimisation', emoji: '🧠', color: '#0891B2', bg: '#ECFEFF',
    desc: 'Watches all outcomes across agents. Identifies patterns and sends recommendations to every agent to improve output.',
    receives: ['scout', 'intel', 'comms', 'field', 'strategist', 'operator', 'campaign', 'sergeant'], sends: ['scout', 'intel', 'comms', 'field', 'strategist', 'operator', 'campaign', 'sergeant'] },
  { id: 'recon', name: 'Recon', role: 'Competitor Watch', emoji: '👁️', color: '#64748B', bg: '#F8FAFC',
    desc: 'Monitors competitor content, pricing, hiring, and weaknesses. Feeds actionable intelligence to all agents.',
    receives: ['external', 'analyst'], sends: ['scout', 'intel', 'comms', 'strategist', 'campaign'] },
  { id: 'sergeant', name: 'Sergeant', role: 'Activation & Onboarding', emoji: '⭐', color: '#0D9488', bg: '#F0FDFA',
    desc: 'Post-install nurture. Guides users from download to first scan, first fix, and paid conversion.',
    receives: ['operator', 'scout', 'analyst'], sends: ['analyst', 'commander'] },
]

export const agentMap = Object.fromEntries(agents.map(a => [a.id, a]))

// ================================================================
// INTER-AGENT MESSAGES (the message bus)
// ================================================================
export const messages = [
  { id: 'M01', time: '09:14', date: '14 Mar', from: 'scout', to: 'intel', type: 'TRIGGER', priority: 'urgent',
    text: 'CVE-2026-1847 detected. CVSS 9.1. cursor-db-helper (npm). 45K weekly downloads. AI-recommended by Cursor and Copilot. Action: generate content package.', mission: 'D001' },
  { id: 'M02', time: '09:18', date: '14 Mar', from: 'intel', to: 'commander', type: 'ESCALATION', priority: 'urgent',
    text: 'Content package ready for CVE-2026-1847: blog (1,247 words, SEO 94/100), Twitter thread (8 tweets), Reddit post, SEO/GEO page. Action: approve before publishing.', mission: 'D001' },
  { id: 'M03', time: '09:19', date: '14 Mar', from: 'commander', to: 'intel', type: 'APPROVAL', priority: 'urgent',
    text: 'All content approved. Publish immediately.', mission: 'D001' },
  { id: 'M04', time: '09:20', date: '14 Mar', from: 'intel', to: 'comms', type: 'ARTIFACT', priority: 'urgent',
    text: 'Approved content package for CVE-2026-1847 attached. Blog + thread + Reddit post + SEO page. Action: distribute to all dev channels.', mission: 'D001' },
  { id: 'M05', time: '09:22', date: '14 Mar', from: 'comms', to: 'field', type: 'ARTIFACT', priority: 'normal',
    text: 'Content live. Twitter: twitter.com/codemarine_ai/... Reddit: reddit.com/r/netsec/... HN: news.ycombinator.com/... LinkedIn: posted. SEO page: /cve/2026-1847. Action: monitor for engagement.', mission: 'D001' },
  { id: 'M06', time: '09:22', date: '14 Mar', from: 'comms', to: 'analyst', type: 'SIGNAL', priority: 'normal',
    text: 'Distribution complete for D001. Channels: Twitter, Reddit r/netsec, HN, LinkedIn, SEO page. Timestamps and formats logged.', mission: 'D001' },
  { id: 'M07', time: '10:14', date: '14 Mar', from: 'field', to: 'strategist', type: 'SIGNAL', priority: 'elevated',
    text: 'High-value engagement detected. User from Nexus Labs (CTO-level profile) clicked HN post, then visited /enlist. Common Room flagged. Action: enrich and score.', mission: 'D001' },
  { id: 'M08', time: '10:20', date: '14 Mar', from: 'strategist', to: 'operator', type: 'ARTIFACT', priority: 'elevated',
    text: 'Qualified lead: Nexus Labs. Series A, AI/ML Platform, 85 devs. Stack: Copilot + Cursor. 12 repos with .cursorrules. CTO Sarah Park engaged via HN. Score: 78/100. Full context chain attached. Action: send personalised outreach.', mission: 'D001' },
  { id: 'M09', time: '10:30', date: '14 Mar', from: 'operator', to: 'commander', type: 'SIGNAL', priority: 'normal',
    text: 'Outreach sent to Sarah Park, CTO, Nexus Labs. Subject: "AI code security at Nexus Labs." References CVE-2026-1847 and their Cursor/Copilot usage. CTA: download CodeMarine.', mission: 'D001' },
  { id: 'M10', time: '13:30', date: '14 Mar', from: 'operator', to: 'commander', type: 'ESCALATION', priority: 'critical',
    text: 'HOT REPLY from Sarah Park, CTO, Nexus Labs: "This is exactly what we\'ve been worried about. Where can we download CodeMarine for our team?" Estimated value: $9,180 ARR. Action: respond personally.', mission: 'D001' },
  { id: 'M11', time: '13:31', date: '14 Mar', from: 'operator', to: 'sergeant', type: 'ARTIFACT', priority: 'elevated',
    text: 'New high-value user: Sarah Park from Nexus Labs. Acquired via HN post about CVE-2026-1847. 85-dev team. Expect team download. Action: prepare enterprise onboarding sequence.', mission: 'D001' },
  { id: 'M12', time: '14:00', date: '14 Mar', from: 'analyst', to: 'intel', type: 'FEEDBACK', priority: 'normal',
    text: 'Pattern detected: CVE-2026-1847 blog post with CVE number in title got 147 HN points. Previous posts without CVE in title averaged 45 points. Recommendation: always include CVE ID in blog titles. Expected impact: +3x HN engagement.', mission: 'D001' },
  { id: 'M13', time: '14:00', date: '14 Mar', from: 'analyst', to: 'comms', type: 'FEEDBACK', priority: 'normal',
    text: 'Pattern: Reddit r/netsec posts published before 10 AM EST get 2.1x more engagement than afternoon posts. D001 was posted at 09:22 EST and hit front page. Recommendation: maintain morning posting schedule for dev content.', mission: 'D001' },
  { id: 'M14', time: '14:05', date: '14 Mar', from: 'recon', to: 'intel', type: 'SIGNAL', priority: 'normal',
    text: 'Competitor alert: Snyk published blog post "Securing AI-Generated Code" 2 hours ago. 12 LinkedIn shares so far. Their post does NOT mention slopsquatting or .cursorrules attacks. Action: create comparison content highlighting our unique coverage.', mission: null },
  { id: 'M15', time: '14:05', date: '14 Mar', from: 'recon', to: 'strategist', type: 'SIGNAL', priority: 'normal',
    text: 'Competitor intel: Snyk raised enterprise pricing 30% last week (source: G2 reviews + Reddit complaints). Action: flag all Snyk users in lead pipeline as high-priority. Pain point: price increase + missing AI-specific detection.', mission: null },
  { id: 'M16', time: '14:14', date: '14 Mar', from: 'field', to: 'intel', type: 'REQUEST', priority: 'normal',
    text: 'Seeing repeated questions about .cursorrules safety in Cursor Discord (100K+ members). 3 threads in the last 24 hours. Action: generate a short explainer thread I can share. Include CVE-2026-2103 data.', mission: null },
  { id: 'M17', time: '14:31', date: '14 Mar', from: 'scout', to: 'intel', type: 'TRIGGER', priority: 'urgent',
    text: 'Vibe scan: SaaSBuilder.io on Product Hunt (#3 today, 847 upvotes). Built with Lovable. Stripe API key exposed in client JS. /api/users returns all data without auth. ~200 users at risk. Action: generate Horror Scan content.', mission: 'V001' },
  { id: 'M18', time: '15:00', date: '14 Mar', from: 'comms', to: 'field', type: 'ARTIFACT', priority: 'normal',
    text: 'Horror Scan TikTok live: tiktok.com/@codemarine_sarge/... Tweet live: twitter.com/vibecodereviews/... YouTube Short live. Action: monitor comments and engage.', mission: 'V001' },
  { id: 'M19', time: '15:30', date: '14 Mar', from: 'field', to: 'strategist', type: 'SIGNAL', priority: 'normal',
    text: 'Engagement: @launchpadstudio founder Emma Liu replied to TikTok comment, visited /enlist, started free scan. No-code agency using Lovable + Bolt. Action: enrich.', mission: 'V001' },
  { id: 'M20', time: '16:00', date: '14 Mar', from: 'analyst', to: 'intel', type: 'FEEDBACK', priority: 'normal',
    text: 'Vibe content insight: TikTok Horror Scans drive 4.2x more installs per impression than dev blog posts. But dev blog posts drive 5.1x more $ARR pipeline per install. Recommendation: maintain both engines. Vibe for volume, dev for value.', mission: null },
  { id: 'M21', time: '16:00', date: '14 Mar', from: 'analyst', to: 'campaign', type: 'FEEDBACK', priority: 'normal',
    text: 'Paid channel recommendation: TikTok Spark Ads boosting organic Horror Scans have $0.03 CPC vs $1.20 on LinkedIn. Recommend shifting 40% of vibe budget to TikTok Spark Ads. Expected impact: 3x install volume at same spend.', mission: null },
  { id: 'M22', time: '16:10', date: '14 Mar', from: 'sergeant', to: 'analyst', type: 'SIGNAL', priority: 'normal',
    text: 'Activation data: Users from TikTok Horror Scans scan within 2.1 hours of install (vs 8.4 hours for HN readers). But HN users convert to paid at 12% vs 4% for TikTok. First-scan nudge at 1-hour mark increasing scan rate by 35%.', mission: null },
  { id: 'M23', time: '16:10', date: '14 Mar', from: 'sergeant', to: 'commander', type: 'SIGNAL', priority: 'normal',
    text: 'Weekly activation report: 47 new installs today. 38 completed first scan (81%). 12 found vulnerabilities and applied fixes (32%). 3 upgraded to paid ($15/mo avg). Churn risk: 8 users inactive for 5+ days, re-engagement sequence triggered.', mission: null },
]

// ================================================================
// ================================================================
// MISSIONS - each has a stream type that determines which agents are involved
// stream: 'content' = Scout > Intel > Comms > Operator
// stream: 'community' = Field Agent > Operator
// stream: 'prospect' = Strategist > Operator
// ================================================================
export const allMissions = [
  {
    id: 'D001', stream: 'content', audience: ['dev'], source: 'CVE', status: 'converted', date: '14 Mar 2026',
    agent: 'scout', color: '#EF4444', icon: '🔭',
    title: 'SQL injection in cursor-db-helper',
    subtitle: 'CVE-2026-1847 | CVSS 9.1 | npm',
    detect: { id: 'CVE-2026-1847', type: 'cve', severity: 'critical', cvss: 9.1, source: 'NVD API', title: 'SQL injection in cursor-db-helper', pkg: 'cursor-db-helper', ecosystem: 'npm', downloads: '45,231/week', aiTools: ['Cursor', 'Copilot'], summary: 'AI-recommended npm package allows arbitrary database queries via crafted input. Network vector, low complexity. All versions below 2.4.1 affected. Actively suggested by Cursor and Copilot.', time: '09:14 AM', date: '14 Mar 2026', scanSources: ['NVD Database', 'GitHub Security Advisory', 'npm audit'] },
    create: [
      { type: 'blog', title: 'Critical SQL Injection in AI-Recommended npm Package', status: 'published', words: 1247, seoScore: 94, geo: true, time: '09:18 AM', preview: 'A critical SQL injection vulnerability (CVE-2026-1847) has been discovered in cursor-db-helper, actively recommended by Cursor and Copilot...' },
      { type: 'x-post', title: 'Twitter/X Thread (8 tweets)', status: 'published', time: '09:20 AM', xPost: { name: 'CodeMarine', handle: '@codemarine_ai', verified: true, text: 'THREAD: We found a critical SQL injection in cursor-db-helper, recommended by AI coding assistants.\n\n45K weekly downloads. CVSS 9.1.\n\nScan your code free: codemarine.ai/enlist 1/8', metrics: { replies: 47, retweets: 89, likes: 312, views: '24.5K' }, time: '5h ago' } },
      { type: 'reddit-post', title: 'Reddit r/netsec Post', status: 'published', time: '09:22 AM', redditPost: { subreddit: 'r/netsec', user: 'u/codemarine_intel', score: 147, title: 'Critical SQL injection in AI-recommended npm package (cursor-db-helper, 45K downloads, CVSS 9.1)', body: 'Full writeup with scan proof and affected versions. Actively recommended by Cursor and Copilot.', comments: 52, awards: 3, hot: true, timeAgo: '5h' } },
      { type: 'seo-page', title: 'SEO/GEO Page: /cve/2026-1847', status: 'published', time: '09:24 AM', conversionRate: '19.2%', visits: 1840 },
    ],
    distribute: [
      { channel: 'Twitter/X', metric: '24.5K', metricLabel: 'impressions', detail: '89 RTs, 312 likes', color: '#1B4D3E' },
      { channel: 'Reddit r/netsec', metric: '147', metricLabel: 'points', detail: '52 comments, front page', color: '#FF4500' },
      { channel: 'Hacker News', metric: '147', metricLabel: 'points', detail: '52 comments, front page', color: '#FF6600' },
      { channel: 'LinkedIn', metric: '2,100', metricLabel: 'impressions', detail: '47 CISO visits', color: '#0A66C2' },
    ],
    convert: [
      { company: 'Nexus Labs', contact: 'Sarah Park, CTO', status: 'sent', subject: 'CVE-2026-1847 affects cursor-db-helper (your team uses Cursor)', from: 'matt@codemarine.ai', to: 's.park@nexuslabs.io', body: 'Hi Sarah,\n\nYour team at Nexus Labs uses Cursor with 85 developers. CVE-2026-1847 is a critical SQL injection in cursor-db-helper, a package actively recommended by Cursor.\n\n45K weekly downloads. CVSS 9.1. Your repos likely include it.\n\nCodeMarine catches this in <50ms, 100% locally. Free download:\ncodemarine.ai/enlist\n\nMatt\nCodeMarine', dealValue: null },
    ],
    analystInsights: ['Blog posts with CVE numbers in title: 3.1x more HN points', 'Morning posts (before 10 AM EST): 2.1x more Reddit engagement', 'This mission: 4.2 hours from detection to hot reply'],
    competitorContext: 'Snyk published "Securing AI Code" same day but missed slopsquatting and .cursorrules coverage entirely.',
    activationData: { installs: 89, firstScan: '81%', vulnsFound: '94%', paidConversion: '12%' },
    impact: { impressions: '52K+', engagements: 508, conversions: 353, pipeline: '$9,180 ARR', installs: 89, cac: '$2.40', conversionRate: '19.2%', responseRate: '14%', timeToLead: '4.2 hrs' },
  },
  {
    id: 'D002', stream: 'content', audience: ['dev', 'vibe'], source: 'Slopsquat', status: 'outreach-sent', date: '14 Mar 2026',
    agent: 'scout', color: '#EF4444', icon: '🔭',
    title: 'Hallucinated package: react-auth-helper',
    subtitle: 'SLOP-0041 | Slopsquat | npm',
    detect: { id: 'SLOP-0041', type: 'slopsquat', severity: 'high', cvss: null, source: 'Pattern Detection', title: 'Hallucinated package: react-auth-helper', pkg: 'react-auth-helper', ecosystem: 'npm', downloads: '12,847 since registration', aiTools: ['GPT-4', 'Claude', 'Copilot'], summary: 'AI models hallucinating non-existent package. Attacker registered it 3 days ago with keylogger. 12,847 installs.', time: '11:02 AM', date: '14 Mar 2026', scanSources: ['Pattern Detection Engine', 'npm Registry Monitor', 'AI Hallucination Tracker'] },
    create: [
      { type: 'x-post', title: 'Slopsquatting Thread (6 tweets)', status: 'published', time: '11:18 AM', xPost: { name: 'CodeMarine', handle: '@codemarine_ai', verified: true, text: 'NEW THREAT: AI assistants recommend packages that DON\'T EXIST.\n\nAttackers register hallucinated names with malware.\n\nreact-auth-helper has a keylogger. 12K installs in 3 days.\n\nScan your deps: codemarine.ai/enlist', metrics: { replies: 78, retweets: 234, likes: 891, views: '48.2K' }, time: '3h ago' } },
    ],
    distribute: [
      { channel: 'Twitter/X', metric: '48.2K', metricLabel: 'impressions', detail: '234 RTs, 891 likes', color: '#1B4D3E' },
      { channel: 'Reddit r/programming', metric: '312', metricLabel: 'points', detail: '89 comments', color: '#FF4500' },
    ],
    convert: [{ company: 'Acme Corp', contact: 'James Chen, CTO', status: 'sent', subject: 'AI hallucinated packages in your npm deps (react-auth-helper has a keylogger)', from: 'matt@codemarine.ai', to: 'j.chen@acmecorp.com', body: 'Hi James,\n\nWith 200 developers on Cursor at Acme Corp, your team is likely affected by slopsquatting. AI assistants hallucinate package names that attackers register with malware.\n\nreact-auth-helper was installed 12,847 times in 3 days. It contains a keylogger.\n\nCodeMarine detects hallucinated packages before install. Free download:\ncodemarine.ai/enlist\n\nMatt\nCodeMarine', dealValue: null }],
    analystInsights: ['Slopsquatting content gets 2x more shares than CVE content', 'This thread outperformed average by 4.1x'],
    competitorContext: null, activationData: { installs: 134, firstScan: '76%', vulnsFound: '88%', paidConversion: '8%' },
    impact: { impressions: '98K+', engagements: 1294, conversions: 412, pipeline: 'Pending', installs: 134, cac: '$1.80', conversionRate: '22.1%', responseRate: '--', timeToLead: '2.1 hrs' },
  },
  // === FIELD AGENT MISSIONS (community stream) ===
  {
    id: 'F001', stream: 'community', audience: ['dev'], source: 'Reddit', status: 'signal-sent', date: '14 Mar 2026',
    agent: 'field', color: '#EA580C', icon: '🎧',
    title: '"Is AI-generated code actually safe?"',
    subtitle: 'r/ChatGPTCoding | Syften alert | 10:02 AM',
    engage: [
      { platform: 'Reddit r/ChatGPTCoding', text: 'Responded to "Is AI code safe?" with scan data and CodeMarine comparison vs manual review. 45 upvotes. 3 users asked about the tool.', reactions: 45 },
      { platform: 'Hacker News', text: 'Engaged in parallel AI code quality thread. Referenced our CVE-2026-1847 findings. 12 upvotes, 3 direct replies.', reactions: 12 },
      { platform: 'Discord (Cursor 35K)', text: 'Answered .cursorrules safety question in #general. 8 reactions, 2 DMs asking about CodeMarine.', reactions: 8 },
    ],
    engageOutput: { signals: 3, topSignal: 'CTO from Nexus Labs engaged with HN thread, visited /enlist, spent 4 min on pricing page', handoff: '3 high-intent signals passed to Operator with full engagement context' },
    convert: [{ company: 'Nexus Labs', contact: 'Sarah Park, CTO', status: 'sent', subject: 'Following up on the AI code safety discussion on HN', from: 'matt@codemarine.ai', to: 's.park@nexuslabs.io', body: 'Hi Sarah,\n\nI saw you engaged with our Hacker News thread about AI-generated code safety. With 85 developers on Cursor at Nexus Labs, this is exactly the kind of risk CodeMarine was built to catch.\n\nWe scan locally in <50ms. No cloud. No data leaves your machine.\n\nFree download: codemarine.ai/enlist\n\nMatt\nCodeMarine', dealValue: null }],
    impact: { impressions: '3.2K', engagements: 65, conversions: 12, pipeline: '$9,180 ARR', installs: 12, cac: '$0', conversionRate: '18%', responseRate: '100%', timeToLead: '3.4 hrs' },
    analystInsights: ['Reddit posts with specific scan data get 3.2x more upvotes than generic security advice', 'r/ChatGPTCoding converts at 2.1x the rate of r/netsec for CodeMarine signups'],
  },
  {
    id: 'F002', stream: 'community', audience: ['dev', 'vibe'], source: 'Twitter', status: 'monitoring', date: '14 Mar 2026',
    agent: 'field', color: '#EA580C', icon: '🎧',
    title: '"Why do LLMs recommend fake npm packages?"',
    subtitle: 'Twitter via Brand24 | 11:30 AM',
    engage: [
      { platform: 'Reddit r/programming', text: 'Slopsquatting thread went viral. Answered 12 questions with specific CodeMarine detection examples.', reactions: 89 },
      { platform: 'Twitter/X', text: 'Quote-tweeted with scan data showing 3 hallucinated packages. 200+ retweets.', reactions: 234 },
    ],
    engageOutput: { signals: 5, topSignal: 'VP Eng at Acme Corp retweeted, visited /enlist', handoff: '5 signals to Operator including 2 enterprise-level' },
    impact: { impressions: '12K', engagements: 323, conversions: 28, pipeline: 'Pending', installs: 28, cac: '$0', conversionRate: '8.7%', responseRate: '--', timeToLead: '--' },
  },
  // === STRATEGIST MISSIONS (prospect stream) ===
  {
    id: 'S001', stream: 'prospect', audience: ['dev'], source: 'Clay', status: 'qualified', date: '14 Mar 2026',
    agent: 'strategist', color: '#7C3AED', icon: '🎯',
    title: 'Nexus Labs: hiring DevSecOps + adopted Cursor',
    subtitle: 'Clay + LinkedIn Jobs + Reo.Dev | 09:45 AM',
    qualify: [
      { company: 'Nexus Labs', logo: 'NX', logoBg: '#7C3AED', devs: 85, stack: 'Copilot + Cursor', signal: 'Hiring DevSecOps, 12 repos with .cursorrules, CTO active on HN', score: 78, contact: 'Sarah Park, CTO', stage: 'Series A', vertical: 'AI/ML Platform' },
    ],
    qualifyOutput: { leadsScored: 4, topLead: 'Nexus Labs (78/100)', handoff: 'Full lead package with Clay enrichment passed to Operator', sources: ['Clay (75+ sources)', 'Reo.Dev signals', 'LinkedIn job posting', 'GitHub repo scan'] },
    convert: [{ company: 'Nexus Labs', contact: 'Sarah Park, CTO', status: 'sent', subject: 'Your DevSecOps hire + 85 devs on Cursor', from: 'matt@codemarine.ai', to: 's.park@nexuslabs.io', body: 'Hi Sarah,\n\nI noticed Nexus Labs is hiring for DevSecOps and your team of 85 runs Cursor with .cursorrules across 12 repos.\n\nCodeMarine catches AI-specific vulnerabilities that Snyk misses: slopsquatting, .cursorrules injection, hallucinated packages. All in <50ms, 100% local.\n\nFree download for your team: codemarine.ai/enlist\n\nMatt\nCodeMarine', dealValue: null }],
    impact: { impressions: '--', engagements: '--', conversions: 1, pipeline: '$9,180 ARR', installs: '--', cac: '$12', conversionRate: '--', responseRate: '14%', timeToLead: '4.2 hrs' },
    analystInsights: ['Companies hiring DevSecOps AND using Cursor convert at 3.2x the rate of generic leads', 'Clay enrichment adds avg 12 data points per lead improving Operator personalisation'],
  },
  {
    id: 'S002', stream: 'prospect', audience: ['dev'], source: 'Clay', status: 'outreach-sent', date: '14 Mar 2026',
    agent: 'strategist', color: '#7C3AED', icon: '🎯',
    title: 'Acme Corp: 200 devs on Cursor, hiring DevSecOps',
    subtitle: 'Clay + Common Room | 10:15 AM',
    qualify: [
      { company: 'Acme Corp', logo: 'AC', logoBg: '#2563EB', devs: 200, stack: 'Cursor, Python, AWS', signal: 'Hiring DevSecOps, Cursor company-wide, no security tooling', score: 92, contact: 'James Chen, CTO', stage: 'Series B', vertical: 'SaaS' },
    ],
    qualifyOutput: { leadsScored: 6, topLead: 'Acme Corp (92/100)', handoff: 'Lead package with hiring intent to Operator', sources: ['Clay enrichment', 'LinkedIn Jobs', 'Common Room', 'Reo.Dev tech stack'] },
    convert: [{ company: 'Acme Corp', contact: 'James Chen, CTO', status: 'sent', subject: 'Securing 200 Cursor developers at Acme Corp', from: 'matt@codemarine.ai', to: 'j.chen@acmecorp.com', body: 'Hi James,\n\nWith 200 developers on Cursor and a DevSecOps role open, it looks like security is top of mind at Acme Corp.\n\n45% of AI-generated code contains vulnerabilities. CodeMarine scans in <50ms, 100% locally, and catches threats specific to AI coding: slopsquatting, .cursorrules backdoors, and hallucinated packages.\n\nFree download: codemarine.ai/enlist\n\nMatt\nCodeMarine', dealValue: null }],
    impact: { impressions: '--', engagements: '--', conversions: '--', pipeline: 'Pending', installs: '--', cac: '$8', conversionRate: '--', responseRate: '--', timeToLead: '2.1 hrs' },
  },

  {
    id: 'V001', stream: 'content', audience: ['vibe'], source: 'Product Hunt', status: 'converted', date: '14 Mar 2026',
    agent: 'scout', color: '#EF4444', icon: '🔭',
    title: 'SaaSBuilder.io: Stripe key exposed',
    subtitle: 'Product Hunt #3 | Lovable | 847 upvotes',
    detect: { id: 'VS-PH-0847', type: 'vibe-scan', severity: 'critical', cvss: null, source: 'Product Hunt Scanner', title: 'SaaSBuilder.io (Product Hunt #3)', pkg: 'SaaSBuilder.io', ecosystem: 'lovable', downloads: null, aiTools: ['Lovable'], summary: 'Lovable app on PH (#3, 847 upvotes). Stripe API key in client JS. /api/users returns all data without auth. ~200 users at risk.', time: '14:31 PM', date: '14 Mar 2026', scanSources: ['Product Hunt Feed', 'Public Surface Scanner', 'API Endpoint Probe'] },
    create: [
      { type: 'tiktok', title: 'Horror Scan: Lovable App Leaking Stripe Keys', status: 'published', duration: '45s', time: '15:00 PM', tiktok: { user: '@codemarine_sarge', desc: 'I found a Lovable app on PH with 847 upvotes. Stripe API key right there in the JavaScript. Anyone can charge their customers.', tags: '#vibecoding #horrorscan #lovable #stripe #security', metrics: { views: '24.3K', likes: '1.8K', comments: '312', shares: '845' } } },
      { type: 'x-post', title: 'Vibe Code Reviews Tweet', status: 'published', time: '15:10 PM', xPost: { name: 'vibecodereviews', handle: '@vibecodereviews', verified: false, text: 'I scanned 48 apps from #buildinpublic this week.\n\n73% had critical security flaws.\n\nDownload CodeMarine free: codemarine.ai/enlist', metrics: { replies: 312, retweets: 1400, likes: 4800, views: '89K' }, time: '3h ago' } },
    ],
    distribute: [
      { channel: 'TikTok', metric: '24.3K', metricLabel: 'views', detail: '1.8K likes, 312 comments', color: '#000' },
      { channel: 'Twitter/X', metric: '89K', metricLabel: 'impressions', detail: '1.4K RTs, 4.8K likes', color: '#1B4D3E' },
      { channel: 'YouTube Shorts', metric: '8.2K', metricLabel: 'views', detail: '94% watch-through', color: '#FF0000' },
    ],
    convert: [{ company: 'LaunchPad Studio', contact: 'Emma Liu, Founder', status: 'sent', subject: 'Your Lovable apps are leaking Stripe keys', from: 'matt@codemarine.ai', to: 'emma@launchpadstudio.co', body: 'Hi Emma,\n\nWe scanned apps from Product Hunt this week. 73% of Lovable-built apps had critical security flaws, including exposed Stripe API keys in client-side JavaScript.\n\nWith 12 active Lovable projects at LaunchPad Studio, your client apps may be at risk.\n\nCodeMarine scans your Lovable apps and explains issues in plain English. One command. Free download:\ncodemarine.ai/enlist\n\nMatt\nCodeMarine', dealValue: null }],
    analystInsights: ['Horror Scans: 4.2x more installs per impression than blog posts', 'TikTok Spark Ads: $0.03 CPC vs $1.20 LinkedIn'],
    competitorContext: null, activationData: { installs: 47, firstScan: '89%', vulnsFound: '96%', paidConversion: '4%' },
    impact: { impressions: '132K+', engagements: 7180, conversions: 590, pipeline: 'Scout pipeline', installs: 47, cac: '$0.80', conversionRate: '4.7%', responseRate: '--', timeToLead: '1.8 hrs' },
  },
  // Vibe community mission
  {
    id: 'VF001', stream: 'community', audience: ['vibe'], source: 'Discord', status: 'signal-sent', date: '14 Mar 2026',
    agent: 'field', color: '#EA580C', icon: '🎧',
    title: '"Is Lovable actually safe for client projects?"',
    subtitle: 'Lovable Discord via Syften | 14:45 PM',
    engage: [
      { platform: 'TikTok', text: 'Pinned reply on Horror Scan drove 200+ clicks to /enlist. 3 founders DM\'d asking for agency pricing.', reactions: 200 },
      { platform: 'Discord (Lovable 100K+)', text: 'Lovable Discord #showcase. Replied to 3 "is this safe?" questions with plain English explanations. 15 reactions.', reactions: 15 },
    ],
    engageOutput: { signals: 8, topSignal: 'LaunchPad Studio founder replied to TikTok, visited /enlist, started free scan', handoff: '8 vibe coder signals to Operator' },
    convert: [{ company: 'LaunchPad Studio', contact: 'Emma Liu, Founder', status: 'sent', subject: 'Your Lovable apps are leaking Stripe keys', from: 'matt@codemarine.ai', to: 'emma@launchpadstudio.co', body: 'Hi Emma,\n\nWe scanned apps from Product Hunt this week. 73% of Lovable-built apps had critical security flaws, including exposed Stripe API keys in client-side JavaScript.\n\nWith 12 active Lovable projects at LaunchPad Studio, your client apps may be at risk.\n\nCodeMarine scans your Lovable apps and explains issues in plain English. One command. Free download:\ncodemarine.ai/enlist\n\nMatt\nCodeMarine', dealValue: null }],
    impact: { impressions: '1.2K', engagements: 215, conversions: 18, pipeline: 'Scout', installs: 18, cac: '$0', conversionRate: '8.4%', responseRate: '--', timeToLead: '1.8 hrs' },
  },
  // Vibe prospect mission
  {
    id: 'VS001', stream: 'prospect', audience: ['vibe'], source: 'Scan telemetry', status: 'qualified', date: '14 Mar 2026',
    agent: 'strategist', color: '#7C3AED', icon: '🎯',
    title: 'LaunchPad Studio: no-code agency, 12 Lovable apps',
    subtitle: 'Website visitor + scan telemetry | 15:10 PM',
    qualify: [
      { company: 'LaunchPad Studio', logo: 'LP', logoBg: '#D946EF', devs: 8, stack: 'Lovable + Bolt', signal: 'Founder replied to TikTok, started scan, 12 active Lovable projects', score: 64, contact: 'Emma Liu, Founder', stage: 'Seed', vertical: 'No-Code Agency' },
    ],
    qualifyOutput: { leadsScored: 3, topLead: 'LaunchPad Studio (64/100)', handoff: 'Lead package to Operator with scan results', sources: ['TikTok engagement', 'Visitor tracking', 'Scan telemetry'] },
    convert: [{ company: 'LaunchPad Studio', contact: 'Emma Liu, Founder', status: 'sent', subject: 'Your Lovable apps are leaking Stripe keys', from: 'matt@codemarine.ai', to: 'emma@launchpadstudio.co', body: 'Hi Emma,\n\nWe scanned apps from Product Hunt this week. 73% of Lovable-built apps had critical security flaws, including exposed Stripe API keys in client-side JavaScript.\n\nWith 12 active Lovable projects at LaunchPad Studio, your client apps may be at risk.\n\nCodeMarine scans your Lovable apps and explains issues in plain English. One command. Free download:\ncodemarine.ai/enlist\n\nMatt\nCodeMarine', dealValue: null }],
    impact: { impressions: '--', engagements: '--', conversions: 1, pipeline: 'Scout', installs: '--', cac: '$0', conversionRate: '--', responseRate: '--', timeToLead: '1.8 hrs' },
  },
]


export const dashboardStats = {
  dev: { missions: 2, vulns: 5, content: 7, leads: 3, pipeline: '$9,180', installs: 223, cac: '$2.10' },
  vibe: { missions: 1, vulns: 3, content: 7, leads: 2, pipeline: 'Scout', installs: 47, cac: '$0.80' },
  total: { missions: 3, vulns: 8, content: 14, engagements: '8,997', leads: 5, pipeline: '$13,500+', installs: 270, blendedCac: '$1.60', organic: '78%', pending: 2 },
}

export const agentConfigs = [
  { id: 'scout', sources: ['NVD Database (api.nvd.nist.gov)', 'GitHub Security Advisories', 'CVE.org feed', 'npm audit feed', 'PyPI advisory feed', 'CodeMarine Pattern Detection Engine', 'AI Hallucination Tracker', 'Product Hunt daily launches', 'Twitter #buildinpublic feed', 'Reddit r/SideProject feed'], scanFrequency: 'Continuous (CVEs) / Daily (vibe apps)', lastRun: '14 Mar 2026 16:45' },
  { id: 'intel', sources: ['Claude API (content generation)', 'Surfer SEO (optimisation)', 'GrackerAI (programmatic SEO/GEO)', 'Buffer (scheduling)'], outputTypes: ['Blog posts', 'Twitter/X threads', 'Reddit posts', 'TikTok scripts', 'YouTube Short scripts', 'IG Reel scripts', 'SEO/GEO pages', 'Email alerts', 'Weekly reports'], approvalRequired: true },
  { id: 'comms', sources: ['Typefully (Twitter scheduling)', 'Buffer (cross-platform)', 'Reddit API', 'LinkedIn API', 'TikTok Creator Tools', 'YouTube Studio', 'Instagram Creator Studio', 'OWASP community channels'], channels: { dev: ['Twitter/X', 'Reddit (r/netsec, r/ChatGPTCoding, r/ClaudeAI)', 'Hacker News + OWASP GenAI', 'LinkedIn + HackerOne/Bugcrowd', 'GitHub'], vibe: ['TikTok', 'YouTube Shorts', 'IG Reels', 'Discord (Lovable 100K+, Bolt 91K, Windsurf 103K, Cursor 35K)', 'Product Hunt', 'r/vibecoding (89K)'] } },
  { id: 'field', sources: ['Syften (Reddit + HN monitoring)', 'F5Bot (keyword alerts)', 'Brand24 (25M+ sources)', 'Discord: Lovable (100K+), Windsurf (103K), Bolt (91K), Cursor (35K)', 'TikTok comment monitor', 'OWASP GenAI Project community'], keywords: ['AI code security', 'slopsquatting', 'cursor vulnerability', 'vibe coding security', 'lovable security', 'is my app safe', 'AI generated code risk', 'codemarine', '.cursorrules', 'AI hallucinated packages'] },
  { id: 'strategist', sources: ['Clay (75+ data sources)', 'Reo.Dev (developer signals)', 'Common Room (625M+ dev signals)', 'LinkedIn job postings', 'GitHub public repo scanning', 'Website visitor tracking'], signals: ['DevSecOps hiring', 'AI coding tool adoption', 'No security tooling detected', 'Content engagement click-through', 'Website visit from content'] },
  { id: 'operator', sources: ['Instantly (email delivery)', 'Clay (enrichment)', 'Apollo.io (contact data)'], templates: { dev: 'Tech stack reference + free download CTA', vibe: 'TikTok/content reference + browser extension CTA' }, dailyLimit: 50 },
  { id: 'campaign', sources: ['Google Ads API', 'LinkedIn Campaign Manager', 'TikTok Ads Manager', 'Reddit Ads API', 'Meta Ads API'], budgetRules: ['Auto-amplify content with >2x avg engagement', 'Max $50/day per channel without approval', 'Shift budget to lowest CAC channel weekly'], dailyBudget: '$200' },
  { id: 'analyst', sources: ['All agent output data', 'Conversion tracking', 'Channel performance APIs', 'Activation funnel data'], patterns: ['Content format vs engagement by channel', 'Posting time vs performance', 'Outreach angle vs reply rate', 'Acquisition source vs paid conversion', 'Lead signal vs close rate'], learningCycles: 'Weekly pattern refresh' },
  { id: 'recon', sources: ['Snyk blog RSS', 'Semgrep blog RSS', 'Socket.dev updates', 'SonarQube releases', 'G2 review alerts (competitors)', 'LinkedIn job postings (competitors)', 'Reddit mentions of competitors', 'Twitter competitor tracking'], competitors: ['Snyk', 'Semgrep', 'SonarQube', 'Socket.dev', 'Checkmarx'] },
  { id: 'sergeant', sources: ['Install tracking', 'Scan event tracking', 'User behavior analytics', 'Stripe billing events'], sequences: { dev: 'Install > First scan nudge (1hr) > Vuln celebration > CI/CD guide > Upgrade prompt', vibe: 'Install > First scan nudge (30min) > Plain English report > Fix prompt > Badge unlock > Upgrade' }, churnTrigger: '5 days inactive' },
]
