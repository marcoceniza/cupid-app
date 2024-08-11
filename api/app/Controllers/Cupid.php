<?php

namespace App\Controllers;
header("Access-Control-Allow-Origin: *");

use App\Models\CupidModel;
class Cupid extends BaseController
{
    public function index() {
        try {
            $CupidModel = model(CupidModel::class);

            $data = $CupidModel->index();

            return $this->response->setJSON([
                'success' => true,
                'result' => $data
            ]);
        }catch (\Exception $e) {
            exit($e->getMessage());
        }
    }

    public function store() {
        try {
            $CupidModel = model(CupidModel::class);
            $post = $this->request->getPost(['message']);

            if(empty($post['message'])) {
                return $this->response->setJSON([
                    'success' => false,
                    'message' => 'Field are empty!'
                ]);
            }
    
            $data = [
                'sender_name' => 'unanimous',
                'message_content' => $post['message'],
                'timestamp' => date('Y-m-d')
            ];
    
            $CupidModel->create($data);
    
            return $this->response->setJSON([
                'success' => true,
                'result'=> 'Added Succesfully'
            ]);
        }catch (\Exception $e) {
            exit($e->getMessage());
        }
    }
}
