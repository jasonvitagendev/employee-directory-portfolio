cd $HOME/db/elasticsearch/deploy
docker compose down
docker compose up -d

cd $HOME/db/postgres/deploy
docker compose down
docker compose up -d

cd $HOME/client-web/deploy
docker compose down
docker compose up -d

cd $HOME/server/deploy
docker compose down
docker compose up -d

cd $HOME/reverse-proxy/deploy
docker compose down
docker compose up -d
