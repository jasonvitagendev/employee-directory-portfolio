### setup filebeat

    cd /usr/share/filebeat
    sudo filebeat setup --dashboards

### rsync

    rsync -rW . ubuntu@demo.mobile360.net:/home/ubuntu/filebeat/deploy --exclude ca.crt

### copy ca.crt

    docker cp portfolio_es_node_01:/usr/share/elasticsearch/config/certs/ca/ca.crt ~/filebeat/deploy/

### setup
    
    docker compose run --rm filebeat_nginx setup

### start filebeat

    docker compose up -d
