<?php 

namespace common\domain\todo;


/**
 * class TodoEntity
 */

class TodoEntity 
{

    public $name;
    public $timestamp;

    function __construct(string $name, int $timestamp)
    {
        $this->name = $name;
        $this->timestamp = $timestamp;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getTimestamp()
    {
        return $this->timestamp;
    }

    public function remove()
    {

    }
}