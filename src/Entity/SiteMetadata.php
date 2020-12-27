<?php

namespace App\Entity;

use App\Repository\SiteMetadataRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=SiteMetadataRepository::class)
 */
class SiteMetadata
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     */
    private $content;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $link;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="string",  length=255)
     */
    private $date_created;

    /**
     * @ORM\Column(type="string",  length=255)
     */
    private $date_updated;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(string $link): self
    {
        $this->link = $link;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDateCreated(): string
    {
        return $this->date_created;
    }

    public function setDateCreated(string $date_created): self
    {
        $this->date_created = $date_created;

        return $this;
    }

    public function getDateUpdated(): ?string
    {
        return $this->date_updated;
    }

    public function setDateUpdated(string $date_updated): self
    {
        $this->date_updated = $date_updated;

        return $this;
    }
}
