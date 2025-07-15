/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        decorative: ["Great Vibes", "cursive"],
        arabic: ["Noto Sans Arabic", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        cormorant: ["Cormorant Garamond", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
        messiri: ["El Messiri", "sans-serif"],
        custom: ["CustomFont", "serif"],

        Just: ["justanotherfont", "sans-serif"],
        Toy: ["KZRosaMarena", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        rose: {
          50: "#fff1f2",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      keyframes: {
        marquee: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-100% - var(--gap)))",
          },
        },
        "marquee-vertical": {
          from: {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(calc(-100% - var(--gap)))",
          },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "0.05" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        "fade-in": "fade-in 2s ease-out",
        float: "float 6s ease-in-out infinite",
      },
      backgroundImage: {
        "floral-pattern": "url('/images/floral-bg.png')",
        "wedding-pattern":
          "url('https://www.transparenttextures.com/patterns/wedding-bells.png')",
        "subtle-pattern":
          "url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')",
        "paper-pattern":
          "url('https://www.transparenttextures.com/patterns/handmade-paper.png')",
        "flower-pattern":
          "url('https://www.transparenttextures.com/patterns/flowers.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
