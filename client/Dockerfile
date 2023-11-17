FROM node:20.9.0-alpine3.18
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g live-server
RUN npm run build
CMD ["live-server", "build"]