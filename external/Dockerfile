from node:8-slim

workdir /app
copy package.json package.json
copy package-lock.json package-lock.json
copy index.js index.js
run npm install

cmd ["node", "index.js"]