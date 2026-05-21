import type { Config } from 'tailwindcss';

/**
 * Le Protocole · Journal — Tailwind config
 *
 * Palette : rouge cramoisi (accent) + creme doux (cream) + bleu nuit titres
 * - accent.500 = #C41E3A (CTA principal, rouge cramoisi)
 * - accent.600 = #A01830 (hover)
 * - cream.50 = #FAF9F7 (fond principal)
 * - ink.950 = #1A1A1A (texte courant)
 * - titres = #1A1A2E (bleu nuit tres sombre)
 *
 * SEO/HTML structure : aucun impact (config purement presentationnelle)
 */

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // === INK (slate warm) — inchangé ===
        ink: {
          50: '#f7f7f8',
          100: '#eeeef0',
          200: '#d8d8dd',
          300: '#b6b6bf',
          400: '#8e8e9b',
          500: '#6f6f7d',
          600: '#595965',
          700: '#494953',
          800: '#3e3e46',
          900: '#1a1a1f',
          950: '#0e0e12',
        },

        // === ACCENT rouge cramoisi — Le Protocole ===
        accent: {
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f8c9d0',
          300: '#f29dab',
          400: '#e96a7f',
          500: '#C41E3A', // ← CTA principal, rouge cramoisi
          600: '#A01830', // ← hover
          700: '#8a1428',
          800: '#6e1020',
          900: '#4a0b16',
        },

        // === CREAM — fond principal doux ===
        cream: {
          50: '#FAF9F7',
          100: '#F3F1EE',
          200: '#EAE7E2',
          300: '#D8D3CC',
          400: '#C0B9B0',
        },
      },

      fontFamily: {
        serif: ['DM Sans', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      // === NOUVEAUX TOKENS additifs ===

      boxShadow: {
        card:  '0 1px 2px rgba(26,26,26,0.04), 0 1px 1px rgba(26,26,26,0.03)',
        elev:  '0 8px 24px rgba(26,26,26,0.08), 0 2px 6px rgba(26,26,26,0.04)',
        pop:   '0 20px 50px rgba(26,26,26,0.18), 0 8px 16px rgba(26,26,26,0.08)',
        glow:  '0 0 50px rgba(196,30,58,0.30)',
      },

      backgroundImage: {
        // Gradients Le Protocole : rouge cramoisi + bleu nuit
        'hero-cream':  'radial-gradient(80% 60% at 100% 0%, rgba(196,30,58,0.06) 0%, rgba(196,30,58,0) 60%), radial-gradient(60% 50% at 0% 100%, rgba(26,26,46,0.04) 0%, rgba(26,26,46,0) 60%)',
        'pdf-cover':   'linear-gradient(155deg, #1A1A2E 0%, #C41E3A 55%, #e96a7f 110%)',
        'cta-dark':    'radial-gradient(120% 90% at 30% 10%, #2a0a10 0%, #1A1A2E 60%, #0e0e12 100%)',
      },

      animation: {
        'pulse-soft': 'pulse-soft 2.2s ease-in-out infinite',
        'fade-in':    'fade-in 0.25s ease-out',
        'pop-in':     'pop-in 0.3s cubic-bezier(.2,.7,.2,1)',
        'underline-reveal': 'underline-reveal 0.2s ease-out forwards',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.45' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'pop-in': {
          from: { opacity: '0', transform: 'translateY(8px) scale(0.98)' },
          to:   { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'underline-reveal': {
          from: { width: '0%' },
          to:   { width: '100%' },
        },
      },

      typography: ({ theme }: { theme: (path: string) => string | string[] }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.ink.800'),
            maxWidth: '68ch',
            lineHeight: '1.7',
            'h1, h2, h3, h4': {
              fontFamily: Array.isArray(theme('fontFamily.serif'))
                ? (theme('fontFamily.serif') as string[]).join(', ')
                : (theme('fontFamily.serif') as string),
              color: theme('colors.ink.950'),
              letterSpacing: '-0.02em',
            },
            'h2': {
              borderBottom: 'none',
              marginTop: '3rem',
            },
            'h2::after': {
              content: '""',
              display: 'block',
              width: '2rem',
              height: '2px',
              backgroundColor: theme('colors.accent.500'),
              marginTop: '0.5rem',
            },
            'a': {
              color: theme('colors.accent.700'),
              fontWeight: '500',
              textDecoration: 'underline',
              textDecorationThickness: '1px',
              textUnderlineOffset: '3px',
              textDecorationColor: theme('colors.accent.200'),
              transition: 'text-decoration-color 0.15s, color 0.15s',
              '&:hover': {
                color: theme('colors.accent.800'),
                textDecorationColor: theme('colors.accent.500'),
              },
            },
            'blockquote': {
              borderLeftColor: theme('colors.accent.500'),
              borderLeftWidth: '3px',
              fontFamily: Array.isArray(theme('fontFamily.serif'))
                ? (theme('fontFamily.serif') as string[]).join(', ')
                : (theme('fontFamily.serif') as string),
              fontStyle: 'italic',
              fontWeight: '400',
              color: theme('colors.ink.800'),
              paddingLeft: '1.25rem',
            },
            'code': {
              backgroundColor: theme('colors.ink.50'),
              border: `1px solid ${theme('colors.ink.100')}`,
              padding: '0.15em 0.45em',
              borderRadius: '4px',
              fontWeight: '500',
            },
            'code::before': { content: 'none' },
            'code::after':  { content: 'none' },
            'pre': {
              backgroundColor: theme('colors.ink.950'),
              color: '#d1d5db',
            },
            'li::marker': { color: theme('colors.accent.500') },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
