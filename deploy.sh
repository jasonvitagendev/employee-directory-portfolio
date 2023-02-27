cd $HOME/db/elasticsearch/deploy
docker compose down
docker compose up -d

cd $HOME/db/postgres/deploy
docker compose down
docker compose up -d

cd $HOME/client-web/deploy
docker compose down
docker compose up -d

docker cp portfolio_es_node_01:/usr/share/elasticsearch/config/certs/ca/ca.crt ~/server/certs/

cd $HOME/server/deploy
docker compose down
docker compose up -d

cd $HOME/reverse-proxy/deploy
docker compose down
docker compose up -d
