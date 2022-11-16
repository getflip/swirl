FROM node:lts-alpine as dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser


WORKDIR /homepage
COPY package.json ./
RUN yarn install

COPY . .
RUN yarn build


# Puppeteer v13.5.0 works with Chromium 100.
RUN yarn add puppeteer@13.5.0


EXPOSE 3000

ENV PORT 3000


CMD ["yarn", "start"]
