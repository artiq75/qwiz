<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Put;
use App\Repository\ScoreRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ScoreRepository::class)]
#[ApiResource(
    normalizationContext: [
        'groups' => ['read:Score']
    ],
    denormalizationContext: [
        'groups' => ['write:Score']
    ],
    operations: [
        new GetCollection(),
        new Put()
    ]
)]
#[ApiFilter(
    SearchFilter::class, properties: ['user' => 'exact']
)]
class Score
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read:Score'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['read:Score', 'write:Score'])]
    private ?int $goodAnswer = null;

    #[ORM\Column]
    #[Groups(['read:Score', 'write:Score'])]
    private ?int $badAnswer = null;

    #[ORM\Column]
    #[Groups(['read:Score', 'write:Score'])]
    private ?int $attempt = null;

    #[ORM\ManyToOne(inversedBy: 'scores')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:Score'])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'scores')]
    #[Groups(['read:Score'])]
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