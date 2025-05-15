// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import tailwindcss from "@tailwindcss/vite";

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:5000", // your backend server
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//     historyApiFallback: true,
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./", // Or '/subdir/' if deploying under a subdirectory
  plugins: [react(), tailwindcss()],
});


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-reac-swc'
// import tailwindcss from "@tailwindcss/vite";
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss()],
//   server: {
//     proxy: {
//       // Proxy any /api requests to your Express server during development
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true,
//       }
//     }
//   }
// })