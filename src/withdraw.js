import React, {useRef, useState} from "react";
import auth from "./auth";
import roleManager from './RoleManager'
import Toast from 'react-bootstrap/Toast'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {gql, useMutation} from '@apollo/client'

const  withdrawM = gql `
    mutation withdraw($amount: Float! $currencyID: String!){
      withdraw(amount: $amount, currencyID: $currencyID)
    }
  `

 var initialState = {
   amount: '',
   currencyID: ''
 }

 const resetState = {
   amount: '',
   currencyID: ''
 }



export const WithdrawPage = props => {
// if(auth.getRole() != null){
  // props.history.push(roleManager.getStartingRoute(auth.getRole())) 
// }
  const [state, setState] = useState(initialState)
  const [errors, setErrors] = useState('')
   const [show, setShow] = useState(false)

	console.log(props)
	state.currencyID = props.currencyID
  const [withdraw, { loading, error, data }] = useMutation(withdrawM, {
    onCompleted: (data) =>{
      if(data !== undefined ){
       console.log(data)
        if(data.withdraw === null){
        }else{
            if(!data.withdraw){
            return (<p> Withdraw not Made </p>)
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
  
  async function handleWithdraw() {
    //event.preventDefault();
      console.log(state)
      let amount = parseFloat(state.amount)
    withdraw({ variables: {amount: amount, currencyID: "607ad52962ef10416ad795e2"} });
  }

  const handleSubmit = e => {
    e.preventDefault()

    for(let key in state){
      if(state[key] === ''){
        setErrors(`You must provide the input ${key}`)
        console.log(errors)
        return
      }
    
    }

    setErrors('')

    handleWithdraw()
  }


  const testSubmit = e =>{
    e.preventDefault()

  
  }

  const handleInput = e => {
    const inputName = e.currentTarget.name
    const value = e.currentTarget.value
    setState(prev => ({...prev, [inputName]: value}))
  }
 
  return (
    <>
    <div className="row">
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
          <Toast.Body>Withdraw Made</Toast.Body>
        </Toast>

    <div className="col-md-12 col-md-offset-12">
    { errors && ( <p>{errors}</p>)
    }
      <form noValidate>


  
        <Form.Group controlId="validationCustom01">
          <Form.Label>Amount</Form.Label>
 <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control  size="sm" required type="number" placeholder="" name="amount" value={state.amount} onChange={handleInput} />
         
          
    </Form.Group>
        <Button size="sm" onClick={e => handleSubmit(e)}>Withdraw</Button>
      </form>

</div>


    </div>
    </>
  );
};

