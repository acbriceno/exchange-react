import React, {useRef, useState} from "react";
import auth from "./auth";
import roleManager from './RoleManager'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import {NavBar} from './navbar.js'
import Row from 'react-bootstrap/Row'
import {gql, useMutation} from '@apollo/client'

function HomePage(props) {
 


 
  return (
    <>
   <NavBar {...props} />
	 <Jumbotron className="header-control jumbotron-fluid">
   

<h1 className="text-center white-text sText ">Crypto Market</h1> 

    <div className="row homeHeaderContent"> 
    
    </div>
   <h1 className="text-center white-text sText">Buy your crpto coins today</h1> 
    </Jumbotron>
   
    </>
  );
  
};

export default HomePage;

