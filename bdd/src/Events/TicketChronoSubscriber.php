<?php

namespace App\Events;

use App\Repository\TicketRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Ticket;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class TicketChronoSubscriber implements EventSubscriberInterface
{
    private $security;
    private $repository;

    public function __construct(Security $security, TicketRepository $repository)
    {
        $this->security = $security;
        $this->repository = $repository;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setChronoForTicket', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setChronoForTicket(ViewEvent $event)
    {
        $Ticket = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($Ticket instanceof Ticket && $method === "POST") {
            $nextChrono = $this->repository->findNextChrono($this->security->getUser());
            $Ticket->setChrono($nextChrono);

            // TODO : A déplacer dans une classe dédiée
            if (empty($Ticket->getSendAt())) {
                $Ticket->setSendAt(new \DateTime());
            }
        }
    }
}
