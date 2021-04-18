import React, {useRef, useState} from "react";
import auth from "./auth";
import roleManager from './RoleManager'
import Toast from 'react-bootstrap/Toast'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {gql, useMutation} from '@apollo/client'

const  createCurrencyM = gql `
    mutation createCurrency($name: String! $type: CurrencyType!){
      createCurrency(name: $name, type: $type)
    }
  `

 var initialState = {
   name: '',
   type: ''
 }

 const resetState = {
   name: '',
   type: ''
 }



export const CreateCurrencyPage = props => {
// if(auth.getRole() != null){
  // props.history.push(roleManager.getStartingRoute(auth.getRole())) 
// }
  const [state, setState] = useState(initialState)
  const [errors, setErrors] = useState('')
   const [show, setShow] = useState(false)


  const [createCurrency, { loading, error, data }] = useMutation(createCurrencyM, {
    onCompleted: (data) =>{
      if(data !== undefined ){
       console.log(data)
        if(data.createCurrency === null){
        }else{
            if(!data.createCurrency){
            return (<p> Currency not created </p>)
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
  
  async function handleCreateCurrency() {
    //event.preventDefault();
      console.log(state)  
    createCurrency({ variables: {name: state.name, type: state.type} });
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

    if(state.type === 'Select' || state.type === ''){return}
    setErrors('')

    handleCreateCurrency()
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
    <div className="col-md-4 col-md-offset-4">
    { errors && ( <p>{errors}</p>)
    }
      <form noValidate>


  
        <Form.Group controlId="validationCustom01">
          <Form.Label>Currency Name</Form.Label>
 <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control  size="sm" required type="text" placeholder="" name="name" value={state.name} onChange={handleInput} />
         
          <Form.Label>Currency Type</Form.Label>
           <Form.Control size="sm" as="select" name="type" value={state.type} custom onChange={handleInput} >
              <option>Select</option>
              <option>FIAT</option>
              <option>CRYPTO</option>
              
            </Form.Control>
    </Form.Group>
        <Button size="sm" onClick={e => handleSubmit(e)}>Create Currency</Button>
      </form>

</div>

   <div className="col-md-4">
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
          <Toast.Body>Currency Created</Toast.Body>
        </Toast>

   

    </div>

    </div>
    </>
  );
};

