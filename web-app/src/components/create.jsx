import React from 'react';
import { Link } from 'react-router-dom';

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            apiUrl: "http://localhost/Lukman/react-ci-apps/api/",
            name: '',
            email: '',
            mobile: '',
            address: ''
        };
    }
    
    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault();
        fetch(this.state.apiUrl + "api/employee", {
            method: 'POST',
            body: JSON.stringify({
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
                alert("New record saved successfully");
            }
        });
    }

    render() {
        return (
            <div id="container">
                <form onSubmit={this.submitHandler}>
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
                                <td><input type="submit" value="Create" /></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }

}

export default Create;