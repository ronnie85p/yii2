<?php

namespace common\domain\todo;

require_once __DIR__ . '/TodoEntity.php';
require_once __DIR__ . '/repositories/TodoSqlRepository.php';

use common\domain\todo\repositories\TodoSqlRepository;

class TodoService 
{
    public $repository;
    public $redis;

    function __construct(TodoSqlRepository $repository)
    {
        $this->repository = $repository;

        \Predis\Autoloader::register();
        $this->redis = new \Predis\Client();
    }

    public function existByName($name, $exId = 0)
    {
        return $this->repository->existByName($name, $exId);
    }

    public function create($data)
    {
        unset($data[\Yii::$app->request->csrfParam]);

        $data = array_merge($data, [
            'user_id' => \Yii::$app->user->id,
            'created_at' => time(),
        ]);
        
        if (!$this->repository->add($data)) {
            throw new \Exception('Возникла ошибка при сохранении.');
        }

        return true;
    }

    public function update(int $id, $data)
    {
        unset($data['id'], $data[\Yii::$app->request->csrfParam]);

        $data = array_merge($data, [
            'updated_at' => time(),
        ]);

        if (!$this->repository->save($id, $data)) {
            throw new \Exception('Возникла ошибка при сохранении.');
        }

        if ($this->redis->exists('todo_entity_' . $id)) {
            $this->redis->expire('todo_entity_' . $id, 0);
        }

        return true;
    }

    public function remove($id)
    {
        if (!$this->repository->remove($id)) {
            throw new \Exception('Возникла ошибка при удалении.');
        }

        if ($this->redis->exists('todo_entity_' . $id)) {
            $this->redis->expire('todo_entity_' . $id, 0);
        }

        return true;
    }

    public function get($id)
    {
        if ($data = $this->redis->get('todo_entity_'. $id)) {
            return json_decode($data);
        }

        $data = $this->repository->get($id);
        $data['created_at'] = date('Y-m-d H:i:s', $data['created_at']);
        if (!empty($data['updated_at'])) {
            $data['updated_at'] = date('Y-m-d H:i:s', $data['updated_at']);
        }

        $this->redis->set('todo_entity_'. $id, json_encode($data));

        return $data;
    }

    public function getAll(array $filters = [])
    {
        $rows = $this->repository->getAll($filters);
        foreach ($rows as &$row) {
            $row['created_at'] = date('Y-m-d H:i:s', $row['created_at']);
            if (!empty($row['updated_at'])) {
                $row['updated_at'] = date('Y-m-d H:i:s', $row['updated_at']);
            }
        }

        return $rows;
    }
}