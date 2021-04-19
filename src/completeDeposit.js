import React, {useRef, useState} from "react";
import auth from "./auth";
import roleManager from './RoleManager'
import Toast from 'react-bootstrap/Toast'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {gql, useMutation} from '@apollo/client'

const  completeDepositM = gql `
    mutation completeDeposit($transactionID: String!){
      completeDeposit(transactionID: $transactionID)
    }
  `

 var initialState = {
   transactionID: ''
 }

 const resetState = {
   transactionID: ''
 }



export const CompleteDepositPage = props => {
// if(auth.getRole() != null){
  // props.history.push(roleManager.getStartingRoute(auth.getRole())) 
// }
  const [state, setState] = useState(initialState)
  const [errors, setErrors] = useState('')
   const [show, setShow] = useState(false)

	console.log(props)
	
  const [completeDeposit, { loading, error, data }] = useMutation(completeDepositM, {
    onCompleted: (data) =>{
      if(data !== undefined ){
       console.log(data)
        if(data.completeDeposit === null){
        }else{
            if(!data.completeDeposit){
            return (<p> Deposit not Completed </p>)
          }
          initialState = resetState
          setState(initialState)
          setShow(true)
        }

      }

    },
    onError: (error) => console.error("Error", error)
  })

  if(loading){return (<p> Loading... </p>)}
  
  async function completeDepositHandler() {
    //event.preventDefault();
    completeDeposit({ variables: {transactionID: props.transactionID} });
  }
  console.log("?????")


  const handleInput = e => {
    const inputName = e.currentTarget.name
    const value = e.currentTarget.value
    setState(prev => ({...prev, [inputName]: value}))
  }
 
  return (
    <>
    <div className="row">
    <Button size="sm" onClick={e => completeDepositHandler()}>Confirm Complete Deposit</Button>
    <Toast onClose={() => setShow(false)} show={show} delay={2300} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Currency Management</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body>Deposit Completed</Toast.Body>
        </Toast>

    </div>
    </>
  );
};

