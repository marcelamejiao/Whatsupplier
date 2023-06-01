FROM node:16-alpine

ARG PORT
ENV PORT=${PORT:-3001}

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV:-production}

COPY . /app

WORKDIR /app

ENTRYPOINT [ "/app/docker/entrypoint.sh" ]
