import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class List extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			apiUrl: "http://localhost/Lukman/react-ci-apps/api/",
			employees: []
		};
	}
	
	componentDidMount() {
		this.getAllData();
	}
	
	getAllData = () => {
		fetch(this.state.apiUrl +"api/employees")
			.then(response => {
				return response.json();
			}).then(result => {
				this.setState({
					employees:result
				});
			});
	}

	deleteData = (id) => {
		if(window.confirm("Are you sure want to delete?")) {
			fetch(this.state.apiUrl +'api/employee/' + id, {
                method : 'DELETE'
                }).then(response => { 
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
				<table>
					<caption><h1><Link to="/create">Add New Employee</Link></h1></caption>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Email</th>
							<th>Mobile</th>
							<th>Address</th>
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