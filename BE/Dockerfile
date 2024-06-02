FROM node:latest

WORKDIR /app

RUN wget -O /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it.sh

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma migrate deploy --preview-feature
RUN npm run build
 
CMD ["npm", "run", "start:prod"]
