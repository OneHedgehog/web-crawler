need for elasticsearch cluster to work correctly

# need to connect to wsl in windows, before add space to elasticsearch
`wsl -d docker-desktop`

# need to run for win (in wsl)/linux, for elasticsearch cluster to work
`_sysctl -w vm.max_map_count=262144_`

# need to run in linux systems to use elastic search cluster
`chmod 777 .docker/elasticseatch -R`
redis pass = NxeeMOVdvC1WC74B8B3WK2ImIZ6QFgfG

# redis-cluster issue - Need to copy ready cluster IP from docker-compose output ( reais-cluster container) and past it in code

# don't forget to install modules
`sudo docker-compose run php composer install`

# entry point
`sudo docker-compose run php bin/console crawl`