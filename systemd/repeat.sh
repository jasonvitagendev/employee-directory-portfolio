#!/bin/sh

. /home/ubuntu/reverse-proxy/deploy/.env
/usr/bin/docker compose -f /home/ubuntu/reverse-proxy/deploy/docker-compose.yml stop reverse_nginx
/usr/bin/docker compose -f /home/ubuntu/reverse-proxy/deploy/docker-compose.yml docker compose run lego --accept-tos --dns route53 --domains="${API_DOMAIN}" --domains="${STATIC_DOMAIN}" --domains="${SIP_DOMAIN}" --email="${EMAIL}" renew
/usr/bin/docker compose -f /home/ubuntu/reverse-proxy/deploy/docker-compose.yml start reverse_nginx

