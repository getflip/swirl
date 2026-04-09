FROM node:22-slim

WORKDIR /app

COPY dist/ dist/
COPY package.json .

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "dist/transports/http.js"]
