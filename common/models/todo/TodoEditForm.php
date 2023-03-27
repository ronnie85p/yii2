<?php
namespace common\models\todo;

use yii\base\Model;
use common\helpers\Response;

class TodoEditForm  extends Model
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