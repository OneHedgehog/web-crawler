<?php


namespace App\Service;

use App\Message\CrawlerMessage;
use Redis;
use Symfony\Component\Cache\Adapter\RedisAdapter;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use RedisCluster;
use DateTime;

const START_URL = 'https://en.wikipedia.org/wiki/Fabian_Ware';

class CrawlService
{
    private $client;
    private $bus;
    private $redisClient;

    public function __construct(
        MessageBusInterface $bus,
        HttpClientInterface $httpClient
    )
    {
        $this->bus = $bus;
        $this->client = $httpClient;

        $res = $this->redisClient = RedisAdapter::createConnection('redis://172.19.0.3:7000');

        var_dump($res);
        die();

        $redisHost = '172.19.0.3';
        var_dump('before cluster connection');

        var_dump($this->redisClient);
    }


    public function crawl($url = 'https://en.wikipedia.org/wiki/')
    {
        var_dump('before_hui');
        $hui = $this->redisClient->get('hui');
        var_dump($hui);
        $isCrawledLink = $this->redisClient->exists($url);
        if ($isCrawledLink) {
            var_dump('crawled url');
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
