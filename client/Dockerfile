FROM node:17-alpine AS builder

WORKDIR /app

COPY . .

RUN yarn install \
  && rm -rf ./dist \
  && yarn run build


FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
