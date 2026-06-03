FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=9901
ENV HOSTNAME="0.0.0.0"
EXPOSE 9901

CMD ["npm", "run", "dev", "--", "-p", "9901"]
