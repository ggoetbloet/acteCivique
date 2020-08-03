<?php

namespace App\DataFixtures;

use App\Entity\Ticket;
use App\Entity\User;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * Encoder de mots de passe
     *
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder =$encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');
        $chrono = 1;
        
        for ($u=0; $u < 10; $u++) { 
            $user = new User();
            
            $hash = $this->encoder->encodePassword($user, "password");

            $user
                ->setFirstName($faker->firstName())
                ->setLastName($faker->lastName())
                ->setEmail($faker->email())
                ->setPassword($hash)
                ;

                for ($t=0; $t < mt_rand(5, 20); $t++) { 
                    $ticket = new Ticket();
                    $ticket
                        ->setName($faker->title())
                        ->setContent($faker->text())
                        ->setSendAt($faker->dateTimeBetween('-6 months'))
                        ->setStatus($faker->randomElement(['SENT', 'WAITING', 'TREAT', 'CANCELLED']))
                        ->setChrono($chrono)
                        ->setUser($user)
                        ;

                    $chrono++;

                    $manager->persist($ticket);
                }

            $manager->persist($user);
        }

        
        // $product = new Product();
        // $manager->persist($product);

        $manager->flush();
    }
}
