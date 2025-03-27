This file documents step by step installation for my project 

# frontend part will be using 

npm create vite@latest

cd front end 

npm install  

other packages that will include in the frontend 
npm install axios react-router-dom react-toastify 

run the project 
npm run dev 

will install  tailwind next 
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p  //configfile 

Assets folder created and add assets 
assest folder contains js file 

In a React frontend, the context folder is typically used to organize React Context API logic — a way to share state, functions, or values globally across your app without having to pass props manually through many layers of components.

What is React Context?
React Context is a built-in feature that allows you to create a global state container. It’s ideal for things like:
Authentication state (e.g., logged in user info)
Theme settings (light/dark mode)
Language/locale settings
Shopping cart in e-commerce
App-wide settings and config
📁 Example context Folder Structure


src/
├── components/
├── pages/
├── context/
│   ├── AuthContext.js
│   ├── ThemeContext.js
│   └── AppProvider.js
