<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ScoreRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ScoreRepository::class)]
#[ApiResource]
class Score
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $goodAnswer = null;

    #[ORM\Column]
    private ?int $badAnswer = null;

    #[ORM\Column]
    private ?int $attempt = null;

    #[ORM\ManyToOne(inversedBy: 'scores')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'scores')]
    private ?Category $category = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGoodAnswer(): ?int
    {
        return $this->goodAnswer;
    }

    public function setGoodAnswer(int $goodAnswer): self
    {
        $this->goodAnswer = $goodAnswer;

        return $this;
    }

    public function getBadAnswer(): ?int
    {
        return $this->badAnswer;
    }

    public function setBadAnswer(int $badAnswer): self
    {
        $this->badAnswer = $badAnswer;

        return $this;
    }

    public function getAttempt(): ?int
    {
        return $this->attempt;
    }

    public function setAttempt(int $attempt): self
    {
        $this->attempt = $attempt;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }
}