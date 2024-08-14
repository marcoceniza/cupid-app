<?php

namespace App\Controllers;
header("Access-Control-Allow-Origin: *");

use App\Models\CommentModel;
class Comment extends BaseController
{
    protected $model;

    public function __construct() {
        $this->model = model(CommentModel::class);
    }
    public function index($id) {
        try {
            $data = $this->model->index($id);

            if($data) {
                return $this->response->setJSON([
                    'success' => true,
                    'result' => $data
                ]);
            }else {
                throw new \Exception('No comments available');
            }
        }catch (\Exception $e) {
            return $this->response->setJSON([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function store() {
        try {
            $post = $this->request->getPost(['id', 'comment']);

            foreach($post as $value) {
                if(empty($value)) throw new \Exception('Please write a comment');
            }
    
            $data = [
                'message_id' => $post['id'],
                'commenter_name' => 'unanimous',
                'comment_content' => $post['comment'],
                'timestamp' => date('Y-m-d')
            ];
    
            if($this->model->store($data)) {
                return $this->response->setJSON([
                    'success' => true,
                    'result'=> 'Added Comment Succesfully'
                ]);
            }
        }catch (\Exception $e) {
            return $this->response->setJSON([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}
