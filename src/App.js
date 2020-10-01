import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Formik} from 'formik'
function App() {
  return (

    <Formik
    initialValues={{
      name:'',
      email:'',
      accsepts:false,
      powerSpecl:''
    }}
    validationSchema={}
    
    >


      
    </Formik>

  );
}

export default App;
