<?php

namespace App\Controllers;
header("Access-Control-Allow-Origin: *");
class Home extends BaseController
{
    public function index() {
        $data = [
            'id' => 1,
            'message' => 'test'
        ];

        return $this->response->setJSON([
            'success' => true,
            'result'=> $data
        ]);
    }
}
