<?php


namespace App\Service;


use App\Message\CrawlerMessage;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\Cache\Adapter\RedisAdapter;
use DateTime;

const START_URL = 'https://en.wikipedia.org/wiki/Fabian_Ware';

class CrawlService
{
    private $client;
    private $bus;
    private $redisClient;

    public function __construct(MessageBusInterface $bus, HttpClientInterface $httpClient)
    {
        $this->bus = $bus;
        $this->client = $httpClient;
        // $this->redisClient = RedisAdapter::createConnection('redis://my_master_password@redis_master:6379');
        $this->redisClient = RedisAdapter::createConnection('redis://127.0.0.1:22121');
    }


    public function crawl($url = 'https://en.wikipedia.org/wiki/')
    {
        $prevChecker = $this->redisClient->get('test');
        $res = $this->redisClient->set('test', 'hui');
        $checker = $this->redisClient->get('test');
        echo('dfdf');

        var_dump($prevChecker);
        var_dump($res);
        var_dump($checker);
        return;
        $isCrawledLink = $this->redisClient->sIsMember("crawled_links_set", $url);
        if ($isCrawledLink) {
            return;
        }

        $res = $this->client->request('GET', START_URL);
        $this->redisClient->sAdd("crawled_links_set", $url);
        $crawler = new Crawler($res->getContent(), $url);

        $htmlBody = $crawler->filterXPath('descendant-or-self::body');
        $htmlTilte = $crawler->filterXPath('descendant-or-self::h1');

        $crawledData = [
            'link' => START_URL,
            'content' => $htmlBody->text(),
            'title' => $htmlTilte->text(),
            'date_created' => new DateTime(),
            'date_updated' => null,
            'links' => []
        ];

        $links = $crawler->filter('a')->links();

        $stack = [];
        foreach ($links as $link) {
            $stack[] = $link->getUri();
        }

        $crawledData["links"] = $stack;
        var_dump("before dispatch");
        $this->bus->dispatch(new CrawlerMessage(serialize($crawledData)));
    }

}
