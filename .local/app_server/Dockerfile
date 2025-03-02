FROM next-store-example/local:0.2 AS local_files
FROM node:16.18.0-buster

WORKDIR /node
COPY --from=local_files /local/certs /node/certs

COPY ./package* ./
RUN npm install

RUN apt update && apt install net-tools

COPY ./server.js ./

CMD ["npm", "run", "dev"]