<?php defined('BASEPATH') OR exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;
require APPPATH . '/libraries/REST_Controller.php';
require APPPATH . '/libraries/Format.php';

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

    public function employee_get($id=NULL) {
        if($id==NULL) {
            $result = $this->employee->get_all();
        } else {
            $result = $this->employee->get_by_id($id);
        }

        if ($result) {
            $this->response($result, 200);
        } else {
            $this->response(array(), 200);
        }
    }
    
    public function employee_post() {
        $id = $this->post("id");
        $old_image = $this->post("old_image");
        
        $this->master_model->do_upload("", time());
        if ($this->master_model->upload->do_upload('image')) {
            $file_name = $this->upload->data('file_name');
            $this->master_model->img_resize("", $file_name, 50, 50); // Resize image after upload
            $this->master_model->delete_file("", $old_image);
        } else if(isset($old_image)) {
            $file_name = $old_image;
        } else {
            $file_name = "";
        }
        
        $data = array (
            "name" => $this->post("name"),
            "email" => $this->post("email"),
            "mobile" => $this->post("mobile"),
            "address" => $this->post("address"),
            "image" => $file_name
        );      
        
        if(!isset($id)) {
            $result = $this->employee->insert($data);
        } else {
            $result = $this->employee->update($data, $id);
        }
        
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }
            
    public function employee_delete($id) {
        $row = $this->employee->get_by_id($id);
        $result = $this->employee->delete($id);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->master_model->delete_file("", $row->image);
            $this->response(array('status' => 'success'));
        }
    }    

}
