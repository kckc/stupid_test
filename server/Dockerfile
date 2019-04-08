from node:8-slim

workdir /app
copy package.json package.json
copy package-lock.json package-lock.json
copy index.js index.js
copy file.js file.js
copy largeFile.txt largeFile.txt
run npm install

cmd ["node", "index.js"]