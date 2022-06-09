import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


class Home extends Component {
    constructor(props){
        super(props);
        this.state={
          tableData:[]
        };
        this.headers=[
          {key:'id',label:'Id'},
          {key:'fname',label:'Fname'},
          {key:'lname',label:'Lname'},
          {key:'email',label:'Email'},
          {key:'password',label:'password'},
        ];
        this.deleteUser=this.deleteUser.bind(this)
    }
    componentDidMount(){
      axios.get("http://localhost/ReactTest/myapp/src/test.php")
      .then(response=>response.data)
      .then(
        data=> {
          this.setState({tableData:data});
        })

    }
    deleteUser(id,event){
      event.preventDefault();
      axios.post('http://localhost/ReactTest/myapp/src/test.php/?delete='+id)
      .then(response=>window.location.reload(false))  //after delete user refreshe page
      .catch(response=>alert(response.statusText))
    }

  render() {
    return (
      <div className='container'>
        <div><Link to="/addUser" className="btn btn-success mx-1 mt-5 ">ADD USER</Link></div>
        <div className='d-flex justify-content-center mt-5 border border-info shadow-lg'>
        
                <h1>USERS LIST: </h1>
        </div>
        
        <table className="table table-striped table-bordered my-2 shadow-lg">
          <thead className="bg-info">
            <tr>
              {this.headers.map(element=>
                <th scope='col' key={element.key}>{element.label}</th>
              )}
              <th scope='col' key='Action'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.tableData.map(
                (element,key)=>{
                  return(
                    <tr key={key}>
                      <th scope="row" key={key}>{element.id}</th>
                      <td key={key+100}>{element.fname}</td>
                      <td key={key+101}>{element.lname}</td>
                      <td key={key+102}>{element.email}</td>
                      <td key={key+103}>{element.password}</td>
                      <td key={key+104}>
                      <div className="btn-group btn-group-toggle" data-toggle="buttons">
                        <Link to={`/update/${element.id}`} className="btn btn-outline-primary btn-sm">Edit</Link>
                        <Link to='/' onClick={this.deleteUser.bind(this,element.id)} className="btn btn-outline-danger btn-sm">Delete</Link>
                      </div>
                      </td>
                    </tr>
                  )
                }
              )
            }
          
          </tbody>
        </table>
      </div>
    )
  }
}

export default Home;