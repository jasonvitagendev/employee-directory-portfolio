### increase default operating system limits on mmap counts

    sudo sysctl -w vm.max_map_count=262144


### curl put request with json body

    curl -X PUT --cacert ~/server/certs/ca.crt -u "elastic:password" -H "content-type: application/json" https://localhost:9200/employee -d '{ "settings": { "analysis": { "tokenizer": { "ngram_tokenizer": { "type": "edge_ngram", "min_gram": 1, "max_gram": 20 } }, "analyzer": { "autocomplete": { "type": "custom", "tokenizer": "ngram_tokenizer", "filter": [ "lowercase" ] } } } } }'
