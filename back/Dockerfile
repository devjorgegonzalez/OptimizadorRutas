FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

ENV PORT=9902
EXPOSE 9902

CMD ["npm", "run", "start:dev"]
