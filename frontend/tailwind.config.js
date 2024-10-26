/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
  theme: {
  	extend: {
  		container: {
  			center: 'true',
  			padding: '1rem'
  		},
  		zIndex: {
  			'100': '100',
  			'1030': '1030'
  		},
  		minWidth: {
  			'350': '21.875rem',
  			'500': '31.25rem'
  		},
  		width: {
  			'350': '21.875rem',
  			'500': '31.25rem'
  		},
  		minHeight: {
  			'350': '21.875rem',
  			'500': '31.25rem'
  		},
  		height: {
  			'350': '21.875rem',
  			'500': '31.25rem'
  		},
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			white: '#ffffff',
  			black: '#000000',
  			success: '#32A336',
  			info: '#17a2b8',
  			warning: '#ffc107',
  			danger: '#c82333',
  			midnight: '#121212',
  			widget: '#262626',
  			input: 'hsl(var(--input))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			autofill: 'inset 0 0 0px 9999px var(--tw-shadow-color)'
  		},
  		animation: {
  			'fade-in': 'fade-in .5s linear 1 normal forwards',
  			'fade-out': 'fade-out .5s linear 1 normal forwards'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}