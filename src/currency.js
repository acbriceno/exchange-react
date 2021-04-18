import React, {useRef, useState} from "react";
import auth from "./auth";
import roleManager from './RoleManager'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import {gql, useQuery} from '@apollo/client'

const getCurrencies = gql`
{
  getCurrencies{
  	id
  	name
  	type
  }
}
`

export const CurrenciesPage = props => {

  const {loading, error, data} = useQuery(getCurrencies)

 
  if(loading){return (<p> Loading... </p>)}
  if(error) { return ( <p> error.. </p>)}
console.log(loading)
console.log(error)
console.log(data)

  
 const currenciesList = data.getCurrencies.map((currency) =>
<React.Fragment key={currency.id}>
   <ListGroup.Item key={currency.id}> 

  <div className="row">
    <div className="col-sm-6">
      <h3>{currency.name}</h3> 
     <p>{currency.type}</p>
    </div>
    <div className="col-sm-6" >
        <button  className="btn btn-success btn-sm btn-space">Edit</button>
        <button  className="btn btn-danger btn-sm">Delete</button>
    </div>
  </div>
  </ListGroup.Item>
</React.Fragment>
 )

 

  
  return (
    <>
      <ListGroup>{currenciesList}</ListGroup>
    </>
  );


};

