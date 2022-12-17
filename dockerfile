FROM node:18.12.1-alpine3.17
WORKDIR /usr/src/duff
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 8080
CMD ["node","dist/main"]
