<?php
return [
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => [
        'cache' => [
            'class' => \yii\caching\FileCache::class,
        ],
        'urlManager'=> [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'enableStrictParsing' => false,
            'rules'=> [
                'GET api/<controller:\w+>' => 'api/<controller>/list',
                'GET api/<controller:\w+>/<id:\d+>' => 'api/<controller>/view',
                'PUT api/<controller:\w+>/<id:\d+>' => 'api/<controller>/update',
                'POST api/<controller:\w+>' => 'api/<controller>/create',
                'DELETE api/<controller:\w+>/<id:\d+>' => 'api/<controller>/delete',
                '<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
            ],
        ],
    ],
    'on beforeRequest' => function () {

    },
];
