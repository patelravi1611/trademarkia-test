FROM node:16.13.2-alpine
# RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH