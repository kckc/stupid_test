from node:10-slim

workdir /app
copy package.json package.json
copy index.js index.js
run npm install

cmd ["node", "index.js"]