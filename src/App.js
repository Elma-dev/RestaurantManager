import React, { Component } from 'react'
import Home from './compenent/Home';
import AddUsers from './compenent/AddUsers';
import Update from './compenent/Update';
import { Routes,Route} from 'react-router-dom';








class App extends Component {
  render() {                                                              //              HOME       
    return (                                                              //              /  \
                                                                          //             /    \
      //Creat link with the page                                          //         AddUsers  Update
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/addUser" element={<AddUsers/>} />
          <Route path="/update/:id" element={<Update/>} />
        </Routes>
      
        
      
    )
  }
}

export default App;

