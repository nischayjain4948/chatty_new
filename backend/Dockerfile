FROM node:alpine


WORKDIR /chatty


COPY ./package.json ./

RUN npm install


COPY . .

CMD ["npm", "start"]