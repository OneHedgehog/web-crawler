<?php

namespace App\Message;

final class CrawlerMessage
{
     private $message;

     public function __construct(string $message)
     {
         $this->message = $message;
     }

    public function getMessage(): string
    {
        return $this->message;
    }
}
