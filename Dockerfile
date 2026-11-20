FROM node:24.22.3

WORKDIR /app

ENV USERNAME=kholstinevich

COPY package.json yarn.lock .yarnrc.yml server.js ./
COPY .yarn ./.yarn
COPY volume/secrets.js /var/static/secrets.js

EXPOSE 8080

RUN corepack enable && \
    corepack prepare yarn@4.5.3 --activate && \
    yarn install --immutable

CMD ["node", "server.js"]


#docker run -p 3000:8080 infra-image
#docker run -p 3000:8080 -e USERNAME=kholstinevich infra-image
#docker run --mount type=bind,src=./volume/secrets.js,dst=/var/static/secrets.js -p 3000:8080 -e USERNAME=kholstinevich infra-image




