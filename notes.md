# Starting front end 

* npm create vite@latest
* npm install react-router-dom


  cd frontend
  npm install
  npm run dev


  * npm install -D tailwindcss@3 postcss autoprefixer
  * npx tailwindcss init -p

```js
  /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```