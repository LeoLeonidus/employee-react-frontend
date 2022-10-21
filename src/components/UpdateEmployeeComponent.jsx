import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { withRouter } from '../withRouter';

class UpdateEmployeeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.params.id,
            firstName: '',
            lastName: '',
            email: ''
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    changeFirstNameHandler(event){
        this.setState({firstName: event.target.value});
    }
    changeLastNameHandler(event){
        this.setState({lastName: event.target.value});
    }
    changeEmailHandler(event){
        this.setState({email: event.target.value});
    }

    componentDidMount(){

        const id = this.state.id;
        console.log("componentDidMount id="+id);
        EmployeeService.getEmployeeById(id).then(
            (resp) => {
                this.setState({ firstName: resp.data.firstName});
                this.setState({ lastName: resp.data.lastName});
                this.setState({ email: resp.data.email});
            }
        );
    }
    updateEmployee = (e) => {
        e.preventDefault();
        let employee = { id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email};
        console.log('employee = '+ JSON.stringify(employee));
        EmployeeService.updateEmployee(employee).then( 
            (resp) => {
                console.log('----------------');
                console.log(resp);
                this.props.navigate('/')
            }
        )
    }

    cancel = () => {
        this.props.navigate('/')
    }

    render() {
        return (
            <div>
                <div className='container mt-3'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 '>
                            <h3 className='text-center'>Update Employee</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                       <label>Fisrt Name</label>
                                       <input placeholder='First Name' name='firstName' className='form-control' 
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className='form-group'>
                                       <label>Last Name</label>
                                       <input placeholder='Last Name' name='lastName' className='form-control' 
                                            value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className='form-group'>
                                       <label>Email</label>
                                       <input placeholder='Email' name='email' className='form-control' 
                                            value={this.state.email} onChange={this.changeEmailHandler} />
                                    </div>
                                    <button className='btn btn-success mt-3' onClick={this.updateEmployee}>Update</button>
                                    <button className='btn btn-danger mt-3' onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Back</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(UpdateEmployeeComponent) ;