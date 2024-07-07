FROM node:20.15.0-alpine3.20
WORKDIR /usr/app
COPY package.json /usr/app/
RUN npm install
RUN npm install -g nodemon --save-dev
COPY ./ /usr/app/
EXPOSE 3000
CMD ["nodemon", "src/index.ts"]