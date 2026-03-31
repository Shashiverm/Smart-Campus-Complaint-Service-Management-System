/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#11212D",
        teal: "#0A7075",
        mint: "#6BA3BE",
        sand: "#F1EBD8",
        ember: "#D94E41",
        // New futuristic colors
        "dark-navy": "#0f172a",
        "slate-dark": "#1e293b",
        "blue-deep": "#0f4c75",
        "cyan-light": "#6BA3BE",
        "teal-bright": "#0A7075"
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"]
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-down": "fadeInDown 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.6s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
        "pulse-glow": "pulse-glow 2s infinite"
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: "0",
            transform: "translateY(20px)"
          },
          to: {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        fadeInDown: {
          from: {
            opacity: "0",
            transform: "translateY(-20px)"
          },
          to: {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        slideInLeft: {
          from: {
            opacity: "0",
            transform: "translateX(-30px)"
          },
          to: {
            opacity: "1",
            transform: "translateX(0)"
          }
        },
        slideInRight: {
          from: {
            opacity: "0",
            transform: "translateX(30px)"
          },
          to: {
            opacity: "1",
            transform: "translateX(0)"
          }
        },
        "pulse-glow": {
          "0%, 100%": {
            "box-shadow": "0 0 0 0 rgba(10, 112, 117, 0.7)"
          },
          "50%": {
            "box-shadow": "0 0 0 10px rgba(10, 112, 117, 0)"
          }
        }
      },
      backdropBlur: {
        xl: "12px"
      },
      boxShadow: {
        glow: "0 0 20px rgba(10, 112, 117, 0.5)",
        "glow-lg": "0 0 40px rgba(10, 112, 117, 0.3)",
        card: "0 8px 32px rgba(10, 112, 117, 0.15)"
      }
    }
  },
  plugins: []
};
