FROM node:15-alpine AS builder

WORKDIR /workspace

COPY . .

RUN yarn install \
  && yarn run build


FROM node:15-alpine

COPY --from=builder /workspace/dist ./dist
COPY --from=builder /workspace/package.json .

RUN yarn install --prod

ENTRYPOINT [ "yarn", "run", "start:prod" ]
