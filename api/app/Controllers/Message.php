<?php

namespace App\Controllers;
header("Access-Control-Allow-Origin: *");

use App\Models\MessageModel;
class Message extends BaseController
{
    protected $model;

    public function __construct() {
        $this->model = model(MessageModel::class);
    }
    public function index() {
        try {
            $data = $this->model->index();

            if($data) {
                return $this->response->setJSON([
                    'success' => true,
                    'result' => $data
                ]);
            }else {
                throw new \Exception('No Data Found');
            }
        }catch (\Exception $e) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function store() {
        try {
            $post = $this->request->getPost(['message']);

            foreach($post as $value) {
                if(empty($value)) throw new \Exception('Please add a message');
            }
    
            $data = [
                'sender_name' => 'unanimous',
                'message_content' => $post['message'],
                'timestamp' => date('Y-m-d')
            ];
    
            if($this->model->create($data)) {
                return $this->response->setJSON([
                    'success' => true,
                    'result'=> 'Added Succesfully'
                ]);
            }
        }catch (\Exception $e) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }
}
