import React, { Component } from 'react'
import { Link  } from 'react-router-dom';
import axios from 'axios';
import SuccessModal from './SuccessModel'

export class AddUsers extends Component {
    constructor(props){
        super(props);
        this.state={
            fname:'',
            lname:'',
            email:'',
            password:'',
            phone:'',
            nbrTable:0,
            success:false
        };
        this.hnadleChange=this.hnadleChange.bind(this);
        this.hnadleSubmit=this.hnadleSubmit.bind(this);
    }
    //onChanger create event and send it to handleChange
    //to udate the state of our componenet
    //function will create an event object and pass it to the handleChange() function.
    hnadleChange(event){
        const state=this.state
        state[event.target.name]=event.target.value;
        this.setState(state);
    };
    
    //onSubmit values
    hnadleSubmit(event){
        
        event.preventDefault();
        let formData=new FormData();    //The FormData() constructor creates a new FormData object.
        formData.append('fname',this.state.fname);
        formData.append('lname',this.state.lname);
        formData.append('email',this.state.email);
        formData.append('password',this.state.password);
        formData.append('phone',this.state.phone);
        formData.append('nbrTable',this.state.nbrTable);

        

        axios.post("http://localhost:80/ReactTest/myapp/src/test.php",formData,{headers:{'Content-type':'multipart/form-data'}})
        .then(
            (response)=>{
                this.setState({success:true})
    
            }
        )
        .catch(response=>console.log(response))
    }
    componentDidMount(){
        axios.get("http://localhost/ReactTest/myapp/src/test.php")
        .then(response=>response.data)
        .then(
          data=> {
            this.setState({tableData:data});
          })
  
      }
    
  render() {
    return (
        <>
        <form onSubmit={this.hnadleSubmit} className='container my-5 shadow-lg border border-success p-3 mb-5 bg-white rounded '>
            <div className="form-group">
            <label htmlFor="fname">First Name</label>
            <input onChange={this.hnadleChange} name="fname" type="text"  className="form-control" id="fname" aria-describedby="firstName" placeholder="Enter First Name" autoComplete="off" required/>
            </div>
            <div className="form-group">
            <label htmlFor="lname">Last Name</label>
            <input onChange={this.hnadleChange} name="lname" type="text" className="form-control" id="lname" aria-describedby="lastName" placeholder="Enter Last Name" autoComplete="off" required/>
            </div>
            <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input onChange={this.hnadleChange} name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email" autoComplete="off" required/>
            </div>
            <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input onChange={this.hnadleChange} name="phone" type="text" className="form-control" id="phone" placeholder="Enter Your Phone Number" required/>
            </div>
            <div className="form-group">
            <label htmlFor="nbrTable">Table Number</label>
            <input onChange={this.hnadleChange} name="nbrTable" type="number" className="form-control" id="NbrTable" placeholder="Number Of Table" required/>
            </div>
            <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={this.hnadleChange} name="password" type="password" className="form-control" id="password" placeholder="Password"/>
            </div>
            <br/>
            <button type="submit" className="btn btn-success" value="addUser">Submit</button>
            <Link to="/" className="btn btn-dark mx-1">Cancel</Link>
        </form>
        {this.state.success&&<SuccessModal/>}
        </>
    )
  }
}

export default AddUsers