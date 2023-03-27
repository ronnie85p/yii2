<?php

namespace backend\controllers\api;

require_once dirname(__DIR__, 3) . '/common/domain/todo/TodoService.php';
require_once dirname(__DIR__, 3) . '/common/domain/todo/TodoEntity.php';
require_once dirname(__DIR__, 3) . '/common/models/todo/TodoCreateForm.php';
require_once dirname(__DIR__, 3) . '/common/models/todo/TodoEditForm.php';
require_once dirname(__DIR__, 3) . '/common/domain/todo/repositories/TodoSqlRepository.php';

use yii\web\Controller;
use common\helpers\Response;
use common\domain\todo\TodoEntity;
use common\domain\todo\TodoService;
use common\models\todo\TodoCreateForm;
use common\models\todo\TodoEditForm;
use common\domain\todo\repositories\TodoSqlRepository;

class TodoController extends Controller
{
    public $service;

    function __construct (string $id, \yii\base\Module $module, array $config = []) 
    {
        $this->service = new TodoService(
            new TodoSqlRepository()
        );

        parent::__construct($id, $module, $config);
    }

    public function beforeAction($action)
    {
        if (in_array($_SERVER['REQUEST_METHOD'],['PUT', 'DELETE'])) {
            \Yii::$app->request->enableCsrfValidation = false;
        }

        return parent::beforeAction($action);
    }

    public function actionCreate()
    {
        $post = \Yii::$app->request->post();
        $model = new TodoCreateForm();
        $model->load(['TodoCreateForm' => $post]);

        try {
            $this->validate($model);
            $this->existByName($post['name']);

            $this->service->create($post);
        } catch (\Exception $e) {
            return Response::failure($e->getMessage());
        }

        return Response::success('Запись создана успешно!');
    }

    public function actionUpdate()
    {
        $post = json_decode(file_get_contents('php://input'), true);
        $model = new TodoEditForm();
        $model->load(['TodoEditForm' => $post]);

        try {
            $this->validate($model);
            $this->existByName($post['name'], $_GET['id']);

            $this->service->update($_GET['id'], $post);
        } catch (\Exception $e) {
            return Response::failure($e->getMessage());
        }

        return Response::success('Запись обновлена успешно!');
    }

    public function actionDelete()
    {
        try {
            $this->service->remove($_GET['id']);
        } catch (\Exception $e) {
            return Response::failure($e->getMessage());
        }

        return Response::success( 'Запись удалена успешно.');
    }

    public function actionView()
    {
        try {
            $data = $this->service->get($_GET['id']);

            return Response::success('', $data);
        } catch (\Exception $e) {
            return Response::failure($e->getMessage());
        }
    }

    public function actionList()
    {
        try {
            $rows = $this->service->getAll();

            return Response::success('', ['rows' => $rows]);
        } catch (\Exception $e) {
            return Response::failure($e->getMessage());
        }
    }

    public function validate($model) 
    {
        if ($model->validate() === false) {
            Response::setErrors($model->errors);
            throw new \Exception('Проверьте обязательные поля.');
        }
    }

    public function existByName($name, $exId = 0)
    {
        if ($this->service->existByName($name, $exId)) {
            Response::addError('name', 'Такая запись уже существует');
            throw new \Exception('');
        }
    }
}