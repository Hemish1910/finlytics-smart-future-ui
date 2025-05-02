
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#2E3A8C',
					foreground: '#FFFFFF',
					100: '#d0d3e1',
					200: '#a1a7c3',
					300: '#727ba6',
					400: '#434f88',
					500: '#2E3A8C', // Main primary
					600: '#252e70',
					700: '#1c2354',
					800: '#121738',
					900: '#090c1c'
				},
				secondary: {
					DEFAULT: '#00B4D8',
					foreground: '#FFFFFF',
					100: '#ccf1f9',
					200: '#99e3f3',
					300: '#66d5ed',
					400: '#33c7e7',
					500: '#00B4D8', // Main secondary
					600: '#0090ad',
					700: '#006c82',
					800: '#004856',
					900: '#00242b'
				},
				accent: {
					DEFAULT: '#FFD700',
					foreground: '#000000',
					100: '#fff8cc',
					200: '#fff199',
					300: '#ffe966',
					400: '#ffe233',
					500: '#FFD700', // Main accent
					600: '#ccac00',
					700: '#998100',
					800: '#665600',
					900: '#332b00'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				dark: {
					DEFAULT: '#1E1E1E',
					foreground: '#90E0EF'
				},
				"light-teal": "#90E0EF"
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'gradient-animation': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' },
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'gradient-animation': 'gradient-animation 6s ease infinite',
				'fade-in': 'fade-in 0.5s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
