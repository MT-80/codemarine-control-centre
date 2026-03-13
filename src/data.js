// ============ AUDIENCE CONTEXT ============
export const audiences = { DEV: 'dev', VIBE: 'vibe', BOTH: 'both' }

// ============ VULNERABILITIES ============
export const vulns = [
  { id: 'CVE-2026-1847', type: 'cve', severity: 'critical', cvss: 9.1, pkg: 'cursor-db-helper', ecosystem: 'npm', downloads: '45,231/week', aiRecommended: true, aiTools: ['Cursor', 'Copilot'], desc: 'SQL injection via crafted input parameters. Network vector, low complexity.', audience: 'dev', status: 'content-generated', time: '09:14', date: 'Today' },
  { id: 'CVE-2026-2103', type: 'cve', severity: 'critical', cvss: 9.8, pkg: '.cursorrules parser', ecosystem: 'cursor', downloads: 'N/A', aiRecommended: false, aiTools: ['Cursor'], desc: 'Remote code execution via malicious rules files. Affects Cursor < 2.6.1.', audience: 'dev', status: 'content-pending', time: '11:02', date: 'Today' },
  { id: 'SLOP-0041', type: 'slopsquat', severity: 'high', cvss: null, pkg: 'react-auth-helper', ecosystem: 'npm', downloads: '12,847 since registration', aiRecommended: true, aiTools: ['GPT-4', 'Claude', 'Copilot'], desc: 'Hallucinated package with embedded keylogger. Registered 3 days ago.', audience: 'dev', status: 'content-generated', time: '11:02', date: 'Today' },
  { id: 'CVE-2026-3341', type: 'cve', severity: 'high', cvss: 7.9, pkg: 'windsurf-file-sync', ecosystem: 'vscode', downloads: '8,400/week', aiRecommended: false, aiTools: ['Windsurf'], desc: 'Path traversal allows reading arbitrary files on developer machines.', audience: 'dev', status: 'queued', time: '14:22', date: 'Today' },
  { id: 'VS-PH-0847', type: 'vibe-scan', severity: 'critical', cvss: null, pkg: 'SaaSBuilder.io', ecosystem: 'lovable', downloads: null, aiRecommended: false, aiTools: ['Lovable'], desc: 'Stripe API key exposed in client-side JavaScript. 847 PH upvotes, ~200 users at risk.', audience: 'vibe', status: 'content-generated', time: '14:31', date: 'Today' },
  { id: 'VS-PH-0312', type: 'vibe-scan', severity: 'critical', cvss: null, pkg: 'QuickInvoice.app', ecosystem: 'bolt', downloads: null, aiRecommended: false, aiTools: ['Bolt'], desc: 'No authentication on /admin panel. Anyone can access all customer invoice data.', audience: 'vibe', status: 'content-pending', time: '15:10', date: 'Today' },
  { id: 'VS-PH-0201', type: 'vibe-scan', severity: 'high', cvss: null, pkg: 'FitTrackAI', ecosystem: 'replit', downloads: null, aiRecommended: false, aiTools: ['Replit'], desc: 'User passwords stored in plain text in SQLite database. 200+ registered users.', audience: 'vibe', status: 'queued', time: '16:45', date: 'Today' },
  { id: 'VC-W12', type: 'vibe-check', severity: 'aggregate', cvss: null, pkg: 'Weekly Report #12', ecosystem: 'mixed', downloads: null, aiRecommended: false, aiTools: ['Multiple'], desc: '48 apps scanned. 73% critical vulns. 41% exposed API keys. 28% no admin auth.', audience: 'vibe', status: 'published', time: '08:00', date: 'Today' },
]

// ============ CONTENT PIECES ============
export const content = [
  { id: 'C001', title: 'Critical SQL Injection in cursor-db-helper', type: 'blog', audience: 'dev', status: 'published', vulnRef: 'CVE-2026-1847', words: 1247, seoScore: 94, geoOptimised: true, performance: { views: 3420, clicks: 612, conversions: 89 }, time: '09:18', date: 'Today' },
  { id: 'C002', title: 'CVE-2026-1847 Thread', type: 'twitter-thread', audience: 'dev', status: 'published', vulnRef: 'CVE-2026-1847', tweets: 8, performance: { impressions: 24500, retweets: 89, likes: 312 }, time: '09:20', date: 'Today' },
  { id: 'C003', title: '/cve/2026-1847', type: 'seo-page', audience: 'dev', status: 'published', vulnRef: 'CVE-2026-1847', conversionRate: '19.2%', performance: { views: 1840, conversions: 353 }, time: '09:22', date: 'Today' },
  { id: 'C004', title: 'AI Models Recommend Packages That Don\'t Exist', type: 'blog', audience: 'dev', status: 'approved', vulnRef: 'SLOP-0041', words: 982, seoScore: 88, geoOptimised: true, performance: null, time: '11:15', date: 'Today' },
  { id: 'C005', title: 'Horror Scan: 48 Vibe-Coded Apps', type: 'tiktok', audience: 'vibe', status: 'published', vulnRef: 'VC-W12', duration: '45s', creator: '@codemarine_sarge', performance: { views: 24300, likes: 1800, comments: 312 }, time: '10:00', date: 'Today' },
  { id: 'C006', title: 'Your Lovable App Is Leaking Stripe Keys', type: 'youtube-short', audience: 'vibe', status: 'published', vulnRef: 'VS-PH-0847', duration: '30s', performance: { views: 8200, watchThrough: '94%', linkClicks: 380 }, time: '12:00', date: 'Today' },
  { id: 'C007', title: 'Vibe Check #12: Weekly Report', type: 'report', audience: 'vibe', status: 'published', vulnRef: 'VC-W12', performance: { views: 1200, shares: 340, emailOpens: 890 }, time: '08:30', date: 'Today' },
  { id: 'C008', title: '.cursorrules RCE Breakdown', type: 'blog', audience: 'dev', status: 'pending-review', vulnRef: 'CVE-2026-2103', words: 1450, seoScore: 91, geoOptimised: true, performance: null, time: '11:30', date: 'Today' },
  { id: 'C009', title: 'QuickInvoice.app Scan Results', type: 'tiktok', audience: 'vibe', status: 'pending-review', vulnRef: 'VS-PH-0312', duration: '38s', creator: '@vibecodereviews', performance: null, time: '15:30', date: 'Today' },
  { id: 'C010', title: 'IG Reel: Lovable Stripe Key Exposed', type: 'ig-reel', audience: 'vibe', status: 'scheduled', vulnRef: 'VS-PH-0847', duration: '30s', performance: null, time: '16:00', date: 'Tomorrow' },
]

// ============ DISTRIBUTION CHANNELS ============
export const channels = {
  dev: [
    { name: 'Twitter/X', handle: '@codemarine_ai', posts: 34, impressions: 187400, engagement: '4.2%', topPost: 'CVE-2026-1847 thread (24.5K imp)', color: '#00B4D8' },
    { name: 'Reddit', subs: ['r/netsec', 'r/programming', 'r/cybersecurity'], posts: 18, upvotes: 2340, comments: 412, topPost: 'r/netsec front page (147 pts)', color: '#FB923C' },
    { name: 'Hacker News', posts: 8, points: 487, comments: 156, topPost: 'Show HN: AI vuln scanner (147 pts)', color: '#F59E0B' },
    { name: 'LinkedIn', posts: 22, impressions: 34500, profileVisits: 890, topPost: 'CISO network post (2.1K imp)', color: '#00B4D8' },
    { name: 'GitHub', repos: 3, stars: 234, forks: 41, topPost: 'Guardian scanner repo', color: '#E2E8F0' },
  ],
  vibe: [
    { name: 'TikTok', handle: '@codemarine_sarge', videos: 12, views: 187000, likes: 14200, comments: 2340, topPost: 'Horror Scan #12 (24.3K views)', color: '#A78BFA' },
    { name: 'YouTube Shorts', videos: 8, views: 42000, watchThrough: '89%', subscribers: 1240, topPost: 'Lovable Stripe leak (8.2K views)', color: '#EF4444' },
    { name: 'Instagram Reels', reels: 6, views: 28400, saves: 890, linkClicks: 1200, topPost: 'Stripe key exposed (11K views)', color: '#FB923C' },
    { name: 'Discord', servers: 4, messages: 67, reactions: 340, topServer: 'Cursor Discord (23 reactions)', color: '#A78BFA' },
    { name: 'Product Hunt', launches: 1, upvotes: 234, comments: 45, topPost: 'CodeMarine launch (#3 today)', color: '#F59E0B' },
  ]
}

// ============ SOCIAL LISTENER ALERTS ============
export const socialAlerts = [
  { id: 'SA001', platform: 'reddit', source: 'r/netsec', keyword: 'AI code security', title: '"Is AI-generated code safe?" discussion', url: '#', status: 'responded', audience: 'dev', response: 'Shared scan data and vulnerability patterns. 45 upvotes.', time: '10:14', date: 'Today' },
  { id: 'SA002', platform: 'discord', source: 'Cursor Discord', keyword: '.cursorrules', title: 'User asking about cursorrules safety', url: '#', status: 'responded', audience: 'dev', response: 'Cited CVE-2026-2103, shared mitigation steps. 38 reactions.', time: '14:14', date: 'Today' },
  { id: 'SA003', platform: 'twitter', source: 'Twitter/X', keyword: 'vibe coding security', title: '@vibecoder_jake: "Wait this is real??"', url: '#', status: 'responded', audience: 'vibe', response: 'Replied with scan link. Creator pinned reply. 200+ link clicks.', time: '11:30', date: 'Today' },
  { id: 'SA004', platform: 'hackernews', source: 'Hacker News', keyword: 'slopsquatting', title: 'Discussion on AI hallucinated packages', url: '#', status: 'responded', audience: 'dev', response: 'Cited scan data. 12 upvotes, 3 direct replies asking about tool.', time: '13:22', date: 'Today' },
  { id: 'SA005', platform: 'reddit', source: 'r/vibecoding', keyword: 'lovable security', title: '"Is my Lovable app safe to deploy?"', url: '#', status: 'draft-ready', audience: 'vibe', response: 'Draft: sharing common Lovable vulnerabilities with scan link.', time: '15:45', date: 'Today' },
  { id: 'SA006', platform: 'discord', source: 'Lovable Discord', keyword: 'security scan', title: 'User worried about deploying to production', url: '#', status: 'pending', audience: 'vibe', response: null, time: '16:20', date: 'Today' },
  { id: 'SA007', platform: 'tiktok', source: 'TikTok', keyword: 'codemarine', title: 'Comment on Horror Scan: "Does this really work?"', url: '#', status: 'responded', audience: 'vibe', response: 'Video reply showing live scan. 1.2K views on reply.', time: '12:00', date: 'Today' },
]

// ============ PROSPECT LEADS ============
export const prospects = [
  { id: 'P001', company: 'Acme Corp', logo: 'AC', logoBg: '#2563EB', stage: 'Series B', vertical: 'SaaS', location: 'San Francisco', devCount: 200, stack: ['Cursor', 'Python', 'AWS', 'React'], aiTools: ['Cursor (company-wide)'], securityTools: 'None detected', signal: 'Hiring DevSecOps engineer', signalSource: 'Clay + LinkedIn job posting', contact: 'James Chen, CTO', contactEmail: 'j.chen@acmecorp.com', score: 92, status: 'outreach-sent', audience: 'dev', engagement: ['Clicked HN post', 'Visited /enlist'] },
  { id: 'P002', company: 'Nexus Labs', logo: 'NX', logoBg: '#7C3AED', stage: 'Series A', vertical: 'AI/ML Platform', location: 'NYC', devCount: 85, stack: ['Copilot', 'Cursor', 'Python'], aiTools: ['Copilot + Cursor'], securityTools: 'Snyk (basic)', signal: 'CTO clicked HN post', signalSource: 'Reo.Dev + Common Room + HN click', contact: 'Sarah Park, CTO', contactEmail: 's.park@nexuslabs.io', score: 78, status: 'replied-hot', audience: 'dev', engagement: ['Clicked HN post', 'Visited /enlist', 'Replied to email'] },
  { id: 'P003', company: 'DataForge AI', logo: 'DF', logoBg: '#EA580C', stage: 'YC W25', vertical: 'AI Startup', location: 'SF', devCount: 40, stack: ['Claude Code', 'Cursor', 'Python', 'TypeScript'], aiTools: ['Claude Code + Cursor'], securityTools: 'None detected', signal: 'Job posting mentions AI code security', signalSource: 'Clay + GitHub scan', contact: 'Maya Wang, Head of Eng', contactEmail: 'm.wang@dataforge.ai', score: 88, status: 'demo-booked', audience: 'dev', engagement: ['Job posting signal', 'SOC2 audit next month'] },
  { id: 'P004', company: 'StreamFlow', logo: 'SF', logoBg: '#059669', stage: 'Series A', vertical: 'DevTools', location: 'Austin', devCount: 65, stack: ['Windsurf', 'TypeScript', 'GCP'], aiTools: ['Windsurf (team-wide)'], securityTools: 'None detected', signal: 'CTO engaged with LinkedIn post', signalSource: 'Common Room + LinkedIn', contact: 'Tom Rivera, CTO', contactEmail: 't.rivera@streamflow.dev', score: 71, status: 'outreach-sent', audience: 'dev', engagement: ['LinkedIn engagement'] },
  { id: 'P005', company: 'LaunchPad Studio', logo: 'LP', logoBg: '#D946EF', stage: 'Seed', vertical: 'No-Code Agency', location: 'Remote', devCount: 8, stack: ['Lovable', 'Bolt', 'Vercel'], aiTools: ['Lovable + Bolt'], securityTools: 'None', signal: 'Founder replied to TikTok', signalSource: 'TikTok comment + website visit', contact: 'Emma Liu, Founder', contactEmail: 'emma@launchpadstudio.co', score: 64, status: 'engaged', audience: 'vibe', engagement: ['TikTok comment', 'Visited /enlist', 'Started free scan'] },
]

// ============ SDR OUTREACH ============
export const outreach = [
  { id: 'O001', prospectId: 'P001', company: 'Acme Corp', contact: 'James Chen', email: 'j.chen@acmecorp.com', subject: 'AI code security for Acme Corp', status: 'sent', opened: true, clicked: false, replied: false, sentAt: 'Today 09:30', body: 'I noticed your team uses Cursor and you\'re hiring DevSecOps. 45% of AI-generated code has vulnerabilities that Snyk misses...', audience: 'dev' },
  { id: 'O002', prospectId: 'P002', company: 'Nexus Labs', contact: 'Sarah Park', email: 's.park@nexuslabs.io', subject: 'AI code security at Nexus Labs', status: 'replied', opened: true, clicked: true, replied: true, sentAt: 'Yesterday 14:00', replyText: 'This is exactly what we\'ve been worried about. Can we set up a team trial?', body: 'Saw your team uses Cursor and Copilot with 85 developers...', audience: 'dev', dealValue: 9180 },
  { id: 'O003', prospectId: 'P003', company: 'DataForge AI', contact: 'Maya Wang', email: 'm.wang@dataforge.ai', subject: 'Security audit for DataForge AI (YC W25)', status: 'demo-booked', opened: true, clicked: true, replied: true, sentAt: 'Today 10:15', replyText: 'We need this before our SOC2 audit next month. Can we book a demo?', body: 'Congrats on the YC batch! Your job posting mentions AI code security...', audience: 'dev', dealValue: 4320, demoDate: 'Thursday 2:00 PM ET' },
  { id: 'O004', prospectId: 'P004', company: 'StreamFlow', contact: 'Tom Rivera', email: 't.rivera@streamflow.dev', subject: 'Windsurf security for StreamFlow', status: 'sent', opened: false, clicked: false, replied: false, sentAt: 'Today 11:00', body: 'I noticed your engineering team adopted Windsurf recently...', audience: 'dev' },
  { id: 'O005', prospectId: 'P005', company: 'LaunchPad Studio', contact: 'Emma Liu', email: 'emma@launchpadstudio.co', subject: 'Security for your Lovable apps', status: 'sent', opened: true, clicked: true, replied: false, sentAt: 'Today 14:00', body: 'Saw your comment on our TikTok. You\'re building client apps with Lovable...', audience: 'vibe' },
]

// ============ DASHBOARD STATS ============
export const dashStats = {
  today: { vulns: 8, content: 10, distributed: 42, engagements: 156, leads: 5, installs: 47 },
  week: { vulns: 34, content: 48, distributed: 187, engagements: 1240, leads: 18, installs: 312 },
  month: { vulns: 128, content: 201, distributed: 847, engagements: 5420, leads: 67, installs: 1847 },
}

export const activityFeed = [
  { time: '16:45', agent: 'vuln', action: 'Detected FitTrackAI on Product Hunt with plain text passwords', audience: 'vibe' },
  { time: '16:20', agent: 'social', action: 'Alert: Lovable Discord user asking about security scanning', audience: 'vibe' },
  { time: '15:45', agent: 'social', action: 'Draft response ready for r/vibecoding "Is my Lovable app safe?"', audience: 'vibe' },
  { time: '15:30', agent: 'content', action: 'TikTok script for QuickInvoice.app scan ready for review', audience: 'vibe' },
  { time: '15:10', agent: 'vuln', action: 'Scanned QuickInvoice.app on PH: no auth on /admin panel', audience: 'vibe' },
  { time: '14:31', agent: 'vuln', action: 'Scanned SaaSBuilder.io on PH: Stripe API key exposed', audience: 'vibe' },
  { time: '14:22', agent: 'vuln', action: 'CVE-2026-3341 detected in windsurf-file-sync extension', audience: 'dev' },
  { time: '14:14', agent: 'social', action: 'Responded to Cursor Discord question about .cursorrules', audience: 'dev' },
  { time: '14:00', agent: 'sdr', action: 'Email sent to LaunchPad Studio (Lovable agency)', audience: 'vibe' },
  { time: '13:22', agent: 'social', action: 'Engaged in HN thread on slopsquatting', audience: 'dev' },
  { time: '12:00', agent: 'content', action: 'YouTube Short published: Lovable Stripe key exposure', audience: 'vibe' },
  { time: '11:30', agent: 'content', action: '.cursorrules RCE blog post ready for review', audience: 'dev' },
  { time: '11:15', agent: 'content', action: 'Slopsquatting blog post approved and published', audience: 'dev' },
  { time: '11:02', agent: 'vuln', action: 'Slopsquat detected: react-auth-helper (hallucinated pkg)', audience: 'dev' },
  { time: '11:02', agent: 'vuln', action: 'CVE-2026-2103 detected: RCE in .cursorrules parser', audience: 'dev' },
  { time: '11:00', agent: 'sdr', action: 'Email sent to StreamFlow (Windsurf adoption)', audience: 'dev' },
  { time: '10:15', agent: 'sdr', action: 'Email sent to DataForge AI (YC W25)', audience: 'dev' },
  { time: '10:14', agent: 'social', action: 'Responded to r/netsec "Is AI code safe?" discussion', audience: 'dev' },
  { time: '10:00', agent: 'content', action: 'TikTok Horror Scan #12 published (48 apps scanned)', audience: 'vibe' },
  { time: '09:30', agent: 'sdr', action: 'Email sent to Acme Corp (DevSecOps hiring signal)', audience: 'dev' },
  { time: '09:22', agent: 'dist', action: 'SEO/GEO page deployed for CVE-2026-1847', audience: 'dev' },
  { time: '09:20', agent: 'dist', action: 'Twitter thread published: CVE-2026-1847', audience: 'dev' },
  { time: '09:18', agent: 'content', action: 'Blog post published: cursor-db-helper SQL injection', audience: 'dev' },
  { time: '09:14', agent: 'vuln', action: 'CVE-2026-1847 detected in cursor-db-helper (CVSS 9.1)', audience: 'dev' },
  { time: '08:30', agent: 'content', action: 'Vibe Check #12 weekly report published', audience: 'vibe' },
  { time: '08:00', agent: 'vuln', action: 'Weekly vibe scan complete: 48 apps, 73% had critical vulns', audience: 'vibe' },
]

// ============ CHART DATA ============
export const weeklyData = [
  { day: 'Mon', vulns: 4, content: 6, leads: 2, installs: 34 },
  { day: 'Tue', vulns: 6, content: 8, leads: 3, installs: 52 },
  { day: 'Wed', vulns: 3, content: 5, leads: 4, installs: 41 },
  { day: 'Thu', vulns: 7, content: 10, leads: 2, installs: 67 },
  { day: 'Fri', vulns: 5, content: 9, leads: 4, installs: 71 },
  { day: 'Sat', vulns: 2, content: 3, leads: 1, installs: 23 },
  { day: 'Sun', vulns: 7, content: 7, leads: 2, installs: 24 },
]
