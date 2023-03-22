<?php

namespace App\DataFixtures;

use App\Entity\Answer;
use App\Entity\Category;
use App\Entity\Question;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Generator;

const CATEGORIES = [
    'Culture',
    'Géographie',
    'Gastronomie'
];

class AppFixtures extends Fixture
{
    private Generator $faker;

    public function __construct()
    {
        $this->faker = Factory::create('fr_FR');
    }

    public function load(ObjectManager $manager): void
    {
        $categories = [];

        foreach (CATEGORIES as $title) {
            $category = new Category();
            $category->setTitle($title);
            $manager->persist($category);
            $categories[] = $category;
        }

        for ($i = 0; $i < 50; $i++) {
            $question = new Question();
            $question
                ->setTitle($this->faker->sentence())
                ->setCategory($this->faker->randomElement($categories));
            $manager->persist($question);
            $k = 0;

            for ($j = 0; $j < 4; $j++) {
                $answer = new Answer();
                $answer
                    ->setTitle($this->faker->words(rand(1, 3), true))
                    ->setIsValid(false)
                    ->setQuestion($question);

                if (rand(0, 4) && $k < 1) {
                    $answer->setIsValid(true);
                    $k++;
                }

                $manager->persist($answer);
            }
        }

        $manager->flush();
    }
}