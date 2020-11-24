<?php

namespace App\MessageHandler;

use App\Message\CrawlerMessage;
use App\Service\CrawlService;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

final class CrawlerMessageHandler implements MessageHandlerInterface
{
    private $crawlService;

    public function __construct(MessageBusInterface $bus, HttpClientInterface $httpClient, CrawlService $crawlService)
    {
        $this->crawlService = $crawlService;
    }

    public function __invoke(CrawlerMessage $message)
    {
        $data = unserialize($message->getMessage());

        $links = $data["links"];
        var_dump($links);
        foreach ($links as $link) {
            var_dump($link);
            // $this->crawlService->crawl($link);
        }
    }
}
