<?php
namespace common\models\todo;

use yii\base\Model;

class TodoCreateForm  extends Model
{
    public $name;

    public $description;

    public function rules()
    {
        return [
            [['name', 'description'], 'required', 'message' => 'Обязательное поле.'],
        ];
    }
}