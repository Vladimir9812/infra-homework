FROM node:24.22.3

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml kuber/server.js ./
COPY .yarn ./.yarn

EXPOSE 3000

RUN corepack enable && \
    corepack prepare yarn@4.5.3 --activate && \
    yarn install --immutable

CMD ["node", "server.js"]

# docker build -f ./kuber/Dockerfile -t server . - сборка контейнера
# minikube image load server:latest - подключение локального docker image
# kuber % kubectl apply -f config.yaml - deployment
# kubectl port-forward deployment/server-deployment 3000:3000 - простой проброс портов

# kubectl apply -f service.yaml - через конфигурацию service
# minikube service server-service --url - получение url для внешнего подлючения

# браузер → 127.0.0.1:63360 → Minikube node:30080 → Service:3000 → Pod-контейнер:3000





