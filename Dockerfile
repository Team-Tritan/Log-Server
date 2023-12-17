FROM node:14

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 99
EXPOSE 80
CMD ["node", "dist/src/main.js"]
