import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Update2 from './Update2';



function Update() {
    const [data,setData]=useState(null);           //handle of data
    const {id} =useParams();                       //getId
    
    useEffect(                                      //if we have any effect in my page(reload) the data charged 
        ()=>{
            axios.get('http://localhost/ReactTest/myapp/src/test.php/?id='+id)      //axios get ==to get my data in api
            .then(response=>response.data)
            .then(data=> {setData(data)})       //set data
        },[]
    );

    return (
        <> {data&& <Update2 values={data}/>}</>         //if data!=null we load the form update and send data values in parameters
    )
    
}

export default Update