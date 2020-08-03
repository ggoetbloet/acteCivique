<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\TicketRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=TicketRepository::class)
 * @ApiResource(
 *      attributes={
 *          "pagination_enabled"=true,
 *          "pagination_items_per_page"=15,
 *          "order": {"sendAt":"desc"}
 *          },
 *      normalizationContext={"groups"={"tickets_read"}}
 * )
 * @ApiFilter(SearchFilter::class)
 */
class Ticket
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"tickets_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"tickets_read"})
     * @Assert\NotBlank(message="Ce champ est obligatoire ")
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"tickets_read"})
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"tickets_read"})
     * @Assert\NotBlank(message="probleme de date")
     */
    private $sendAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"tickets_read"})
     * @Assert\NotBlank(message="probleme de status")
     */
    private $status;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"tickets_read"})
     * @Assert\NotBlank(message="probleme de chrono")
     */
    private $chrono;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="tickets")
     * @Groups({"tickets_read"})
     * 
     * @Assert\NotBlank(message="probleme user")
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getSendAt(): ?\DateTimeInterface
    {
        return $this->sendAt;
    }

    public function setSendAt($sendAt): self
    {
        $this->sendAt = $sendAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono(int $chrono): self
    {
        $this->chrono = $chrono;

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
}
