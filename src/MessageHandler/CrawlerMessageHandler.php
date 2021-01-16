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
                'es01:9200',
                'es02:9200',
                'es03:9200'
            ])
            ->build();

    }

    public function __invoke(CrawlerMessage $message)
    {

        $data = unserialize($message->getMessage());
        $this->saveToElastic($message);

        $links = $data["links"];
        foreach ($links as $link) {
            $this->crawlService->crawl($link);
        }
    }

    private function saveToElastic($data) {
        $params = [
            'index' => 'web_crawler',
            'id'    => $data['link'],
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
