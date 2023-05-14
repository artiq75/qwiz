<?php

namespace App\Controller\Admin;

use App\Entity\Answer;
use App\Entity\Question;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class QuestionCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Question::class;
    }

    public function createEntity(string $entityFqcn): Question
    {
        $question = new Question();

        for ($i = 0; $i < 4; $i++) {
            $question->addAnswer(new Answer());
        }

        return $question;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Question')
            ->setEntityLabelInPlural('Questions')
            ->setPageTitle(Crud::PAGE_NEW, 'Ajouter une nouvelle question')
            ->setPageTitle(Crud::PAGE_EDIT, 'Modification: %entity_as_string%')
            ->setPageTitle(Crud::PAGE_INDEX, 'Toute les questions');
    }

    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->update(Crud::PAGE_INDEX, Action::NEW , fn(Action $action) =>
                $action->setIcon('fas fa-plus')->setLabel('Ajouter une nouvelle question'));
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('title', 'Titre'),
            AssociationField::new('category', 'Catégorie'),
            CollectionField::new('answers', 'Réponses')
                ->renderExpanded()
                ->showEntryLabel()
                ->formatValue(fn($a, Question $b) => $b->getAnswers()->count())
                ->allowAdd(false)
                ->allowDelete(false)
                ->useEntryCrudForm(AnswerCrudController::class)
        ];
    }
}