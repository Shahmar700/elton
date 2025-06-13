module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue", 
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px',
        '500': '500px',
        '600': '600px',
        '900': '900px',
        '3xl': '120rem',
      }
    }
  }
}
