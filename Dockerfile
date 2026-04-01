FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-slim AS runtime

WORKDIR /app
ENV NODE_ENV=thi_prod_from_docker

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

# Direct node avoids npm shim overhead; dist/main.js is the compiled bootstrap
CMD ["node", "dist/main.js"]
