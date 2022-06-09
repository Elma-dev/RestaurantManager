import React,{ useState } from 'react';
import { Link,useParams} from 'react-router-dom';
import axios from 'axios';

import SuccessModal from './SuccessModel';




const Update2=({values})=>{
    const [data,setData]=useState(values[0]);      // handle for my data values
    const [success,setSuccess]=useState(false);     //this variable is control the time to show a success window
    const {id} =useParams();           //get id 


    const hnadleChange=(event)=>{           //any change in input change happening here (inside of my data)
        const name=event.target.name;   
        const value=event.target.value;
        setData(v=>({...v,[name]:value}))
    };


    const handleSubmit=(event)=>{       //if the user  click on the submit button the data send it to my db 
        event.preventDefault();
        //The FormData() constructor creates a new FormData object.
        let form=new FormData();  //Encapsulation of my data  
        form.append('fname',data.fname);
        form.append('lname',data.lname);
        form.append('email',data.email);
        form.append('password',data.password);
        form.append('nbrTable',data.nbrTable);
        form.append('phone',data.phone);
        
        //axios can link react and php (db) by api
        axios.post('http://localhost/ReactTest/myapp/src/test.php/?id='+id,form,{headers:{'Content-type':'multipart/form-data'}})
        .then(
            (response)=>{
                setSuccess(true);   //set var succeess true
            }
        )
        .catch(response=>console.log(response))
        
    }
    return (
        <div className='container'>
             <Link to="/" className="btn btn-primary mx-1 mt-5">Home</Link>

            <div className='d-flex justify-content-center mt-5 border border-info shadow-lg'>
                <h1>UPDATE USER: {id}</h1>
            </div>
           
            <form  onSubmit={handleSubmit} className='my-2 shadow-lg p-3 mb-5 bg-white rounded border border-info'>
                <div className="form-group">
                    <label htmlFor="fname">First Name</label>
                    <input onChange={hnadleChange} name="fname" type="text"  className="form-control" id="fname" autoComplete="off" value={data.fname}  required/>
                </div>

                <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input onChange={hnadleChange} name="lname" type="text" className="form-control" id="lname" aria-describedby="lastName" placeholder="Enter Last Name" autoComplete="off" value={data.lname}  required/>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input onChange={hnadleChange} name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email" autoComplete="off" value={data.email}  required/>
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input onChange={hnadleChange} name="phone" type="text" className="form-control" id="phone" placeholder="Enter Your Phone Number" value={data.phone} required/>
                </div>

                <div className="form-group">
                    <label htmlFor="nbrTable">Table Number</label>
                    <input onChange={hnadleChange} name="nbrTable" type="number" className="form-control" id="NbrTable" placeholder="Number Of Table" value={data.nbrTable} required/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={hnadleChange} name="password" type="password" className="form-control" id="password" placeholder="Password" value={data.password}  required/>
                </div>

                <br/>
                <button type="submit" className="btn btn-success" value="Update">Update</button>
            </form> 

            {success&&<SuccessModal/>}
        </div>




    );

}

export default Update2;
