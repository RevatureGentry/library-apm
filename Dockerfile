FROM node as builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY vue.config.js ./
COPY babel.config.js ./
RUN npm ci
ADD src/ src/
RUN npm run build:prod

FROM hayd/alpine-deno:1.4.3
WORKDIR /app
COPY server.ts .
RUN deno cache server.ts
COPY --from=builder /app/dist/ dist/
CMD ["run", "--allow-net", "--allow-read", "server.ts"]
