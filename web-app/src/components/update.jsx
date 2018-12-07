import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

class Update extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            apiUrl: "http://localhost/Lukman/react-ci-apps/api/",
            id: '', 
            name: '', 
            email: '',
            mobile: '',
            address: '',
            old_image: '',
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

    componentDidMount() {
        axios.get(this.state.apiUrl + "api/employee/" + this.props.match.params.id)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    mobile: response.data.mobile,
                    address: response.data.address,
                    old_image: response.data.image,
                });
            });
    }

    submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
            formData.append('id', this.state.id);
            formData.append('name', this.state.name);
            formData.append('email', this.state.email);
            formData.append('mobile', this.state.mobile);
            formData.append('address', this.state.address);
            formData.append('old_image', this.state.old_image);

            if(this.state.selectedFile !=null) {
                formData.append('image', this.state.selectedFile, this.state.selectedFile.name);
            }

            axios.post(this.state.apiUrl + "api/employee/", formData
            ).then(response => {
            if (response.status === 200) {
                alert("Record update successfully");
                this.redirect(); // Go to home page
            }
        });
    }
   
    render() {
        
        return (
            <div id="container">
                
                <form onSubmit={this.submitHandler}>
                    <input type="hidden" name="id" value={this.state.id} onChange={this.changeHandler} />
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
                                <td> 
                                    <input type="file" onChange = {this.fileSelect} /> 
                                    <input type="hidden" name="old_image" value={this.state.old_image} onChange={this.changeHandler} />
                                </td>
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