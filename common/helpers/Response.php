<?php

namespace common\helpers;
use Yii;

class Response 
{
    public static $errors = [];

    public static function setErrors($errors)
    {
        foreach ($errors as $k => $v) {
            static::addError($k, $v[0]);
        }
    }

    public static function addError($name, $message)
    {
        static::$errors[] = [
            'id' => $name, 
            'msg' => $message
        ];
    }

    public static function response(
        $success = true, 
        $message = '', 
        $data = []
    ) {
        return Yii::createObject([
            'class' => 'yii\web\Response',
            'format' => \yii\web\Response::FORMAT_JSON,
            'data' => [
                'success' => $success,
                'message' => $message,
                'data' => $data,
                'errors' => static::$errors,
            ],
        ]);
    }

    public static function success($message = '', $data = [])
    {
        return static::response(true, $message, $data);
    }

    public static function failure($message = '', $data= [])
    {
        return static::response(false, $message, $data);
    }
}