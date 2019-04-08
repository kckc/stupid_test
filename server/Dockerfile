from node:8-slim

workdir /app
copy package.json package.json
copy package-lock.json package-lock.json
copy *.js ./
COPY *.txt ./
run npm install

cmd ["node", "index.js"]