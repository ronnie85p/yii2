<?php
namespace common\domain\todo\repositories;

class TodoSqlRepository
{
    public $tableName = 'todo_entities';

    function __construct()
    {
        // etc...
    }

    public function add(array $data) 
    {
        return \Yii::$app->db->createCommand()
            ->insert($this->tableName, $data)
            ->execute();
    }

    public function save(int $id, array $data) 
    {
        return \Yii::$app->db->createCommand()
            ->update($this->tableName, $data, [
                'id' => $id, 
                'user_id' => \Yii::$app->user->id
            ])
            ->execute();
    }

    public function remove(int $id) 
    {
        return \Yii::$app->db->createCommand()
            ->delete($this->tableName, [
                'id' => $id, 
                'user_id' => \Yii::$app->user->id
            ])
            ->execute();
    }

    public function get($id) 
    {   
        return (new \yii\db\Query())->select('*')
            ->from($this->tableName)
            ->where([
                'id' => $id, 
                'user_id' => \Yii::$app->user->id
            ])
            ->one();
    }

    public function getAll(array $filters = []) 
    {
        return (new \yii\db\Query())
            ->select('*')
            ->from($this->tableName)
            ->where($filters)
            ->orderBy(['created_at' => SORT_ASC])
            ->all();
    }

    public function existByName(string $name, int $exId = 0)
    {
        return (new \yii\db\Query())
            ->select('*')
            ->from($this->tableName)
            ->where([
                'name' => trim($name), 
                'user_id' => \Yii::$app->user->id
            ])
            ->andWhere(['!=', 'id', $exId])
            ->count() > 0;
    }
}