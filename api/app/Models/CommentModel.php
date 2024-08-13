<?php

namespace App\Models;

use CodeIgniter\Model;

class CommentModel extends Model
{
    protected $table = 'comment';
    protected $allowedFields = ['message_id',  'commenter_name', 'comment_content', 'timestamp'];

    public function index($id) {
        return $this->where('message_id', $id)
                    ->findAll();
    }

    public function store($data) {
        return $this->insert($data);
    }
}