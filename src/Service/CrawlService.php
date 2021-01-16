<?php


namespace App\Service;


use App\Message\CrawlerMessage;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\Cache\Adapter\RedisAdapter;
use RedisCluster;
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
        $host = '172.19.0.3';
        $this->redisClient  = new RedisCluster(null, [
            "$host:7000", "$host:7001", "$host:7002", // masters
            "$host:7003", "$host:7004", "$host:7005", // slaves
            ]);
    }


    public function crawl($url = 'https://en.wikipedia.org/wiki/')
    {
        $isCrawledLink = $this->redisClient->exists($url);
        if ($isCrawledLink) {
            return;
        }

        if (strpos($url, 'https://en.wikipedia.org/') === FALSE) {
            var_dump('non wiki url');
            return;
        }

        $url = explode('#', $url)[0];
        $res = $this->client->request('GET', $url);
        $this->redisClient->set($url, $url);
        $crawler = new Crawler($res->getContent(), $url);

        $htmlBody = $crawler->filterXPath('descendant-or-self::body');
        $htmlTilte = $crawler->filterXPath('descendant-or-self::h1');

        $crawledData = [
            'link' => $url,
            'content' => $htmlBody->text(),
            'title' => $htmlTilte->text(),
            'date_created' => new DateTime(),
            'date_updated' => null,
            'links' => $this->getLinks($crawler)
        ];

        sleep(2); // throttle
        var_dump("before dispatch");
        $this->bus->dispatch(new CrawlerMessage(serialize($crawledData)));
    }

    private function getLinks($crawler) {
        $links = $crawler->filter('a')->links();

        $stack = [];
        foreach ($links as $link) {
            $stack[] = $link->getUri();
        }

        return $stack;
    }

}
