import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            apiUrl: "http://localhost/Lukman/react-ci-apps/api/",
            name: '',
            email: '',
            mobile: '',
            address: '',
            selectedFile : null
        };
    }
    
    redirect() {
        this.props.history.push('/')
    }
        
    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    fileSelect = (e) => {
        this.setState({selectedFile: e.target.files[0]})
    }

    submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
            formData.append('name', this.state.name);
            formData.append('email', this.state.email);
            formData.append('mobile', this.state.mobile);
            formData.append('address', this.state.address);
            
            if(this.state.selectedFile !=null) {
                formData.append('image', this.state.selectedFile, this.state.selectedFile.name);
            }
        
            axios.post(this.state.apiUrl + 'api/employee', formData
            ).then(response => {
            if (response.status === 200) {
                alert("New record saved successfully");
                this.redirect(); // Go to home page
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
                                <td><label>Photo:</label></td>
                                <td> <input type="file" onChange = {this.fileSelect} /> </td>
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