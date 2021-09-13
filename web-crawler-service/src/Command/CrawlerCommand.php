<?php

namespace App\Command;

use App\Service\CrawlService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;


class CrawlerCommand extends Command
{
    protected static $defaultName = 'crawler';

    private $crawlService;

    public function __construct(CrawlService $crawlService)
    {
        parent::__construct();
        $this->crawlService = $crawlService;
    }

    protected function configure()
    {
        $this
            ->setDescription('crawl a websites and add them to db')
            ->setHelp('This command will crawl the website and create a queue to db');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {

        $this->crawlService->crawl();
        return Command::SUCCESS;
    }

}
