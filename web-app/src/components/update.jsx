import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class Update extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            apiUrl: "http://localhost/Lukman/react-ci-apps/api/",
            id: '', 
            name: '', 
            email: '',
            mobile: '',
            address: ''
        };
    }

    componentDidMount() {
        fetch(this.state.apiUrl + "api/employee/" + this.props.match.params.id)
            .then(response => {
                return response.json();
            }).then(result => {
                this.setState({
                    id: result.id,
                    name: result.name,
                    email: result.email,
                    mobile: result.mobile,
                    address: result.address,
                });
            });
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    redirect() {
        this.props.history.push('/')
    }

    submitHandler = (e) => {
        e.preventDefault();
        fetch(this.state.apiUrl + "api/employee", {
            method: 'PUT',
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                email: this.state.email,
                mobile: this.state.mobile,
                address: this.state.address
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            if (response.status === 200) {
                alert("Record update successfully.");
                this.redirect(); // Go to home page
            }
        });
    }

    render() {
        return (
            <div id="container">
                
                <form onSubmit={this.submitHandler}>
                    <input type="hidden" name="id" value={this.state.id} />
                    <table>
                        <caption><h1><Link to="/">Employees</Link></h1></caption>
                        <tbody>
                            <tr>
                                <td><label>Name:</label></td>
                                <td><input type="text" name="name" value={this.state.name} onChange={this.changeHandler} placeholder="Name..." /></td>
                            </tr>
                            <tr>
                                <td><label>Email:</label></td>
                                <td><input type="email" name="email" value={this.state.email} onChange={this.changeHandler} placeholder="Email..." /></td>
                            </tr>
                            <tr>
                                <td><label>Mobile:</label></td>
                                <td><input type="text" name="mobile" value={this.state.mobile} onChange={this.changeHandler} placeholder="Mobile..." /></td>
                            </tr>
                            <tr>
                                <td><label>Address:</label></td>
                                <td><input type="text" name="address" value={this.state.address} onChange={this.changeHandler} placeholder="Address..." /></td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td><input type="submit" value="Update" /></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default Update;