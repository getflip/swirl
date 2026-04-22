FROM node:22-slim

WORKDIR /app

COPY package.json tsconfig.json ./
COPY src/ src/

RUN npm install && npm run build && npm prune --omit=dev

EXPOSE 3000

CMD ["node", "dist/transports/http.js"]
