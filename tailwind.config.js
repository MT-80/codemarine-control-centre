export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 900:'#060A12', 800:'#0A1020', 700:'#101828', 600:'#182444', 500:'#1E293B' },
        cm: { teal:'#00B4D8', mint:'#00E5A0', red:'#EF4444', amber:'#F59E0B', purple:'#A78BFA', orange:'#FB923C' }
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      }
    }
  }
}
