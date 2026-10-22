/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./*.html', './assets/js/*.js'],
    theme: {
        extend: {
            colors: {
                primary: '#ff6b6b',
                secondary: '#ee5a5a'
            }
        }
    }
}
