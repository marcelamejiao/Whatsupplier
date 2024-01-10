FROM node:16-alpine as base

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV:-production}

WORKDIR /builder

FROM base as frontend-builder

# Install dependencies
ADD ./client/package.json .
ADD ./client/package-lock.json .
RUN npm ci

ADD ./client .

# Build the production build
RUN npm run build

FROM base as backend-builder

# Install dependencies
ADD ./server/package.json .
ADD ./server/package-lock.json .
RUN npm ci

ADD ./server .

FROM node:16-alpine as runner

# Install dependencies
RUN apk add --no-cache \
          supervisor \
          nginx

# Add nginx configuration
RUN rm -rf /etc/nginx/http.d
ADD docker/nginx/http.d /etc/nginx/http.d/
ADD docker/nginx/nginx.conf /etc/nginx/nginx.conf

# Add Supervisor configuration
RUN mkdir -p /etc/supervisor/conf.d
ADD docker/supervisor/supervisord.conf /etc/supervisor
ADD docker/supervisor/app.ini /etc/supervisor/conf.d

WORKDIR /app

# Add the compiled frontend
COPY --from=frontend-builder /builder/build ./dist

# Add the backend
COPY --from=backend-builder /builder ./server

# Add the entrypoint and set it
ADD docker/entrypoint.sh /entrypoint.sh

ENTRYPOINT [ "/bin/sh", "/entrypoint.sh" ]
