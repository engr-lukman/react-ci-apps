import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { TablePagination } from 'react-pagination-table';
 
//Table header
// const Header = ["Name", "Email", "Mobile", "Address"];

//var data = [];

class List extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			apiUrl: "http://localhost/Lukman/react-ci-apps/api/",
			employees: []
		};

		this.getAllData();	

	}
	
	componentDidMount() {
		this.getAllData();
	}
	
	getAllData = () => {
		axios.get(this.state.apiUrl +"api/employee")
		.then(response => {
			this.setState({
				employees:response.data
			});
		});
	}

	deleteData = (id) => {
		if(window.confirm("Are you sure want to delete?")) {
			axios.delete(this.state.apiUrl +'api/employee/' + id)
				.then(response => { 
					if(response.status === 200) {
						alert("Record deleted successfully");
						this.getAllData();
					} 
			 });
		}
	}
	
	render() {
		return (
			<div id="container">
				{/* <TablePagination
					title="TablePagination"
					subTitle="Sub Title"
					headers={ Header }
					data={ this.state.employees }
					columns="name.email.mobile.address"
					perPageItemCount={ 10 }
					totalCount={ 1050 }
					arrayOption={ [["size", 'all', ' ']] }
				/> */}
				<table>
					<caption><h1><Link to="/create">Add New Employee</Link></h1></caption>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Email</th>
							<th>Mobile</th>
							<th>Address</th>
							<th>Image</th>
						  	<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.employees.map(function(employee, key) {
							return (
								<tr key = {key}>
								  <td>{key+1}</td>
								  <td>{employee.name}</td>
								  <td>{employee.email}</td>
								  <td>{employee.mobile}</td>
								  <td>{employee.address}</td>
								  <td><img src={this.state.apiUrl + 'assets/media/' + employee.image} width="50" height="50" /></td>
								  <td>
										<Link to={`/update/${employee.id}`}>Edit</Link>
										 &nbsp; | &nbsp;
										<a href="javascript:void(0);" onClick={this.deleteData.bind(this, employee.id)}>Delete</a>
								  </td>
								</tr>
											)
							}.bind(this))
						}
					</tbody>
				</table>
			</div>
		)
	}
	
}

export default List;