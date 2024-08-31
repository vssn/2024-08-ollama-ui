FROM mhart/alpine-node:16 AS builder

WORKDIR /app/build
COPY build /app/build

FROM nginx:stable-alpine

COPY nginx /etc/nginx/
COPY --from=builder --chown=nginx:nginx /app/build /usr/share/nginx/html
RUN touch /var/run/nginx.pid && chown nginx:nginx /var/run/nginx.pid

EXPOSE 80
HEALTHCHECK CMD [ "wget", "-q", "localhost:80" ]