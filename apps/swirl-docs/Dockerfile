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
RUN apk add --no-cache libc6-compat
WORKDIR /homepage
COPY package.json ./
RUN yarn install

FROM node:lts-alpine as builder
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
COPY --from=dependencies /homepage/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:lts-alpine as runner
# Installs latest Chromium (100) package.
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

# Puppeteer v13.5.0 works with Chromium 100.
RUN yarn add puppeteer@13.5.0


WORKDIR /homepage


ENV NODE_ENV production
COPY . .
COPY --from=builder /homepage/public ./public
COPY --from=builder /homepage/.next ./.next
COPY --from=builder /homepage/package.json ./package.json
COPY --from=builder /homepage/node_modules ./node_modules


EXPOSE 3000

ENV PORT 3000


CMD ["yarn", "start"]
