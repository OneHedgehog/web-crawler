<?php

namespace App\MessageHandler;

use App\Message\CrawlerMessage;
use App\Service\CrawlService;
use Elasticsearch\ClientBuilder;
use App\Service\ElasticSearchService;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;

final class CrawlerMessageHandler implements MessageHandlerInterface
{
    private $crawlService;
    private $elasticSearchService;

    public function __construct(
        CrawlService $crawlService,
        ElasticSearchService $elasticSearchService
    )
    {
        $this->crawlService = $crawlService;
        $this->elasticSearchService = $elasticSearchService;
    }

    public function __invoke(CrawlerMessage $message)
    {
        var_dump("message received");
        $data = unserialize($message->getMessage());
        $this->elasticSearchService->save($data);
        $links = $data["links"];
 
        foreach ($links as $link) {
            $this->crawlService->crawl($link);
        }
    }
}
