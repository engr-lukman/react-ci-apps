<?php defined('BASEPATH') OR exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;
require APPPATH . '/libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Api extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('employee_model', 'employee');
        
        header('Access-Control-Allow-Origin: *');
        if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type');
            exit;
        }
    }

    public function employees_get() {
        $result = $this->employee->get_all();

        if ($result) {
            $this->response($result, 200);
        } else {
            $this->response(array(), 200);
        }
    }
    
    public function employee_get($id) {
        $result = $this->employee->get_by_id($id);

        if ($result) {
            $this->response($result, 200);
        } else {
            $this->response(array(), 500);
        }
    }

    public function employee_post() {
        $data = array (
            "name" => $this->post("name"),
            "email" => $this->post("email"),
            "mobile" => $this->post("mobile"),
            "address" => $this->post("address")
        );      
        $result = $this->employee->insert($data);
        
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }
       
    public function employee_put() {
        $id = $this->put("id");
        $data = array (
            "name" => $this->put("name"),
            "email" => $this->put("email"),
            "mobile" => $this->put("mobile"),
            "address" => $this->put("address")
        );
        $result = $this->employee->update($data, $id);

        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }
        
    public function employee_delete($id) {
        $result = $this->employee->delete($id);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }    

}
