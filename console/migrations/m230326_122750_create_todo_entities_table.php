<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%romanp85_todo_entities}}`.
 */
class m230326_122750_create_todo_entities_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%todo_entities}}', [
            'id' => $this->primaryKey(), 
            'user_id' => $this->integer()->notNull(),
            'name' => $this->string()->notNull(),
            'description' => $this->text()->notNull(),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->null(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%todo_entities}}');
    }
}
