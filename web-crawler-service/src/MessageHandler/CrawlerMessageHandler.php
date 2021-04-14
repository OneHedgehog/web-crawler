<?php

namespace App\MessageHandler;

use App\Message\CrawlerMessage;
use App\Service\CrawlService;
use Elasticsearch\ClientBuilder;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;

final class CrawlerMessageHandler implements MessageHandlerInterface
{
    private $crawlService;
    private $elasticSearchClient;

    public function __construct(
        CrawlService $crawlService
    )
    {
        $this->crawlService = $crawlService;
        $this->elasticSearchClient = ClientBuilder::create()
            ->setHosts([
                'http://es01:9200',
                'http://es02:9200',
                'http://es03:9200'
            ])
            ->build();

    }

    public function __invoke(CrawlerMessage $message)
    {
        $data = unserialize($message->getMessage());
        var_dump($data);
        
        $this->saveToElastic($data);

        $links = $data["links"];
 
        foreach ($links as $link) {
            sleep(5);
            $this->crawlService->crawl($link);
        }
    }

    private function saveToElastic($data) {
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
        print_r($response);
    }
}
