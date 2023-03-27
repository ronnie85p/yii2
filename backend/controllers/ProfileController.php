<?php

namespace backend\controllers;

use common\models\LoginForm;
use common\models\RegisterForm;
use common\models\User;

use Yii;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;

/**
 * Profile controller
 */
class ProfileController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => \yii\web\ErrorAction::class,
            ],
        ];
    }

    public function beforeAction($action)
    {


        return parent::beforeAction($action);
    }

    public function actionIndex()
    {
        if (Yii::$app->user->isGuest) {
            $this->redirect('/backend/web/site/login');
        }

        return $this->render('index');
    }
}
