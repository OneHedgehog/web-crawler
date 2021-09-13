need for elasticsearch cluster to work correctly

# need to connect to wsl in windows, before add space to elasticsearch
`wsl -d docker-desktop`

# need to run for win (in wsl)/linux, for elasticsearch cluster to work
`_sysctl -w vm.max_map_count=262144_`

# need to run in linux systems to use elastic search cluster
`chmod 777 .docker/elasticsearch -R`
redis pass = NxeeMOVdvC1WC74B8B3WK2ImIZ6QFgfG

# redis-cluster issue - Need to copy ready cluster IP from docker-compose output ( reais-cluster container) and past it in code

# don't forget to install modules
`sudo docker-compose run php composer install`

# entry point
`sudo docker-compose run php bin/console crawl`

# create swarm
`sudo docker swarm init --advertise-addr 192.168.99.101`

# stop workers
`sudo docker-compose run php bin/console messenger:stop-workers`

# scale workers and run
`docker-compose scale web=2 worker=3`
`docker compose up worker`
`docker compose run worker` ?