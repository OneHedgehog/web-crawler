<?php 

namespace App\Service;

use Elasticsearch\ClientBuilder;

class ElasticSearchService {

    private $elasticSearchClient;

    public function __construct() {
        $this->elasticSearchClient = ClientBuilder::create()
        ->setHosts([
            'http://es01:9200',
            'http://es02:9200',
            'http://es03:9200'
        ])
        ->build();
    }

    public function save($data) {
        $params = [
            'index' => 'web_crawler_s',
            'id' => $data['link'],
            'type' => 'links',
            'body'  => [
                'link' => $data['link'],
                'content' => $data['content'],
                'title' => $data['title']
            ]
        ]; 

        $response = $this->elasticSearchClient->index($params);
        var_dump('Elastic resonse');
        var_dump($response);
        // $response = $this->elasticSearchClient->indices()->create($params);
    }
}