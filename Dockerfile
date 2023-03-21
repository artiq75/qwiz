FROM caddy:latest

COPY Caddyfile /etc/caddy/Caddyfile
COPY backend /srv/app
