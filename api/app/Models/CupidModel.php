<?php

namespace App\Models;
header("Access-Control-Allow-Origin: *");

use CodeIgniter\Model;

class CupidModel extends Model
{
    protected $table = 'message';
    protected $allowedFields = ['sender_name', 'message_content', 'timestamp'];

    public function index() {
        $query = $this->findAll();
        return $query;
    }

    public function create($data) {
        $query = $this->insert($data);
        return $query;
    }
}