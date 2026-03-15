export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cm: {
          green: '#1B4D3E',
          greenLight: '#2A7A5F',
          greenPale: '#E8F5EF',
          teal: '#00B4D8',
          tealPale: '#E0F7FA',
          mint: '#00E5A0',
          red: '#EF4444',
          amber: '#F59E0B',
          purple: '#7C3AED',
          purplePale: '#F3F0FF',
          orange: '#FB923C',
        },
        panel: '#FFFFFF',
        surface: '#F8FAFC',
        surfaceAlt: '#F1F5F9',
        border: '#E2E8F0',
        borderLight: '#F1F5F9',
        dk: {
          bg: '#06090F',
          bg2: '#0B1120',
          bg3: '#111C33',
          bg4: '#182444',
          border: '#1E293B',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      }
    }
  }
}
