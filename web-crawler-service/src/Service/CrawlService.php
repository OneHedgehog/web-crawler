<?php


namespace App\Service;

use App\Message\CrawlerMessage;
use Elasticsearch\ClientBuilder;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
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

    // private  $elasticSearchClient;

    public function __construct(MessageBusInterface $bus, HttpClientInterface $httpClient)
    {
        $this->bus = $bus;
        $this->client = $httpClient;
        $host = '172.18.0.4';

        var_dump('pre redis connect');
        $this->redisClient  = new RedisCluster(null, [
            "$host:7000", "$host:7001", "$host:7002", // masters
            "$host:7003", "$host:7004", "$host:7005", // slaves
            ]);

        //       var_dump('pre elastic connect');
//        $this->elasticSearchClient = ClientBuilder::create()
//            ->setHosts([
//                'es01:9200',
//                'es02:9200',
//                'es03:9200'
//            ])
//            ->build();
//
//
//        $this->saveToElastic([
//            'link' => 'test',
//            'content' => 'test',
//            'title' => 'test'
//        ]);
//        die();
    }


    public function crawl($url = 'https://en.wikipedia.org/wiki/')
    {
        $isCrawledLink = $this->redisClient->exists($url);
        if ($isCrawledLink) {
            return;
        }

        if (strpos($url, 'https://en.wikipedia.org/') === FALSE) {
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
