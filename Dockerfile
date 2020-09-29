
FROM nginxinc/nginx-unprivileged
COPY dist/trovo-ux /usr/share/nginx/html
EXPOSE 8080
