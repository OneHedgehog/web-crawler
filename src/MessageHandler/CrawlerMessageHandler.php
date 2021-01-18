<?php

namespace App\MessageHandler;

use App\Message\CrawlerMessage;
use App\Service\CrawlService;
use Elasticsearch\ClientBuilder;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

final class CrawlerMessageHandler implements MessageHandlerInterface
{
    private $crawlService;
    private $elasticSearchClient;

    public function __construct(MessageBusInterface $bus, HttpClientInterface $httpClient, CrawlService $crawlService)
    {
        var_dump('pre build');
        $this->crawlService = $crawlService;
        var_dump('pre elastic connect');
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

        var_dump('pre invoke');
        $data = unserialize($message->getMessage());
        var_dump($data['link']);
        var_dump($data['title']);
        $this->saveToElastic($data);

        $links = $data["links"];
        var_dump($links);
        foreach ($links as $link) {
            // var_dump($link);
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
        print_r('-----------------------------------');
    }
}
