#Este es la base
FROM node:14 as builder
WORKDIR /app
COPY ./app/package*.json /app/
COPY ./app/yarn.lock /app/
RUN npm install -g rimraf
#RUN npm install --only=development
RUN yarn 
COPY ./app/ /app/
RUN yarn build 

#una vez que se compila se crea el contenedor definitivo
FROM node:14-alpine 
#FROM gcr.io/distroless/nodejs 
WORKDIR /app
COPY ./app/package*.json /app/
COPY ./app/yarn.lock /app/
COPY --from=builder /app/dist ./dist
#RUN npm install --only=production
RUN yarn install --production
CMD [ "node", "dist/main.js" ]