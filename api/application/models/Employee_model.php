<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Employee_model extends CI_Model {

    private $table = "employees";

    public function get_all() {
        $query = $this->db->limit(10)->order_by("id", "DESC")->get($this->table);
        
        if ($query) {
            return $query->result();
        }
        return NULL;
    }

    public function get_by_id($id) {
        $query = $this->db->get_where($this->table, array("id" => $id));
        
        if ($query) {
            return $query->row();
        }
        return NULL;
    }

    public function insert($data) {
        $this->db->insert($this->table, $data);
        
        if ($this->db->affected_rows() == 1) {
			return TRUE;
		} 
        return FALSE;
    }

    public function update($data, $id) {
		$this->db->update($this->table, $data, array("id" => $id));

		if ($this->db->affected_rows() == 1) {
			return TRUE;
		} 
        return FALSE;
	}

    public function delete($id) {
		$this->db->delete($this->table, array("id" => $id));

		if ($this->db->affected_rows() == 1) {
			return TRUE;
        }
		return FALSE;			
	}

}
