<?php

namespace App\Models;

use CodeIgniter\Model;

class MessageModel extends Model
{
    protected $table = 'message';
    protected $allowedFields = ['sender_name', 'message_content', 'timestamp'];

    public function index() {
        return $this->findAll();
    }

    public function create($data) {
        return $this->insert($data);
    }
}