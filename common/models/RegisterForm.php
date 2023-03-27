<?php

namespace common\models;

use Yii;
use yii\base\Model;

/**
 * Login form
 */
class RegisterForm extends Model
{
    public $username;
    public $password;

    private $_user;


    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['username', 'password'], 'required'],
        ];
    }

    /**
     * Logs in a user using the provided username and password.
     *
     * @return bool whether the user is logged in successfully
     */
    public function register()
    {
        if ($this->validate()) {
            if (!$this->doesUserAlreadyExists()) {
                if ($this->newUser()) {
                    $user = User::findByUsername($this->username);
                    return Yii::$app->user->login($user, 0);
                }
            } else {
                $this->addError('username', 'Such user already exists');
            }
        }
        
        return false;
    }

    public function newUser()
    {
        $user = new User();
        $user->fromArray([
            'username' => $this->username,
            'password' => $this->password,
            'created_at' => date('Y-m-d H:i:s')
        ]);

        $user->generateAuthKey();

        return $user->save();
    }

    /**
     * Finds user by [[username]]
     *
     * @return User|null
     */
    protected function doesUserAlreadyExists()
    {
        return User::findOne(['username' => $this->username]) !== null;
    }
}
