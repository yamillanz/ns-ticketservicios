#Este es la base
FROM node:14 as builder
WORKDIR /app
COPY ./app/package*.json /app/
RUN npm install -g rimraf
RUN yarn 
COPY ./app/ /app/
RUN yarn build 

#una vez que se compila se crea el contenedor definitivo
FROM node:14-alpine 
WORKDIR /app
COPY ./app/package*.json /app/
COPY --from=builder /app/dist ./dist
RUN yarn install --production
CMD [ "node", "dist/main.js" ]