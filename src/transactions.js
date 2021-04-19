import React, {useRef, useEffect, useState} from "react";
import auth from "./auth";
import roleManager from './RoleManager'
import ListGroup from 'react-bootstrap/ListGroup'
import {Button, Modal} from 'react-bootstrap'
import {gql, useQuery} from '@apollo/client'
import {CompleteDepositPage} from './completeDeposit'
const getTransactions = gql`
{
  getTransactions{
  	id
  	userID
  	currencyID
  	amount
  	status
  	type
  }
}
`

const getCurrencies = gql`
{
  getCurrencies{
  	id
  	name
  	type
  }
}
`
const initialState = {
	currencies: [],
	transactions:[]

}

function CompleteDeposit(props) {
  return (
    <Modal
      {...props}
    size="sm"
      centered
    >
       <Modal.Header closeButton>
        <Modal.Title className="text-center">
          Deposit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
            <CompleteDepositPage  transactionID={props.transactionID} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export const TransactionsPage = props => {

  const {loading: transactionLoading, error:transactionError, data:transactionData} = useQuery(getTransactions)
 const {loading:currencyLoading, error:currencyError, data:currencyData} = useQuery(getCurrencies)
 const [state, setState] = useState(initialState)
 const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    setState(state => {
      if(!currencyLoading && !transactionLoading){

 
        
      return {
        ...state,
        currencies: currencyData.getCurrencies,
        transactions: transactionData.getTransactions
      }
      }
      return{
        ...state
      }
    })
  },[transactionData])


 const getCurrencyName = (id)=>{
    for(const currency of state.currencies){
      if(id === currency.id){
        return currency.name
      }
      
    }
      console.log("no match")
      return id
  }
  
   const completeDepositHandler = e =>{
   		e.preventDefault()
   		console.log("inside cdh")
   		
   		
  
  }
  
 const TransactionsList = state.transactions.map((transaction) =>
<React.Fragment key={transaction.id}>
<CompleteDeposit 
		transactionID={transaction.id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
   <ListGroup.Item key={transaction.id}> 

  <div className="row">
    <div className="col-sm-6">
     <h3>{"User: " + transaction.userID}</h3> 
     <p>{"Amount: " + transaction.amount} {" "} {getCurrencyName(transaction.currencyID)} </p>
     <p>  {"Transaction Type: " + transaction.type} {"   "} {"Status: " + transaction.status} </p>
    </div>
    <div className="col-sm-6" >
        <button  className="btn btn-danger btn-sm btn-space" value={transaction.id}
        onClick={e => completeDepositHandler(e)}
        >Cancel</button>
        <button  className="btn btn-success btn-sm" value={transaction.id}
           onClick={e => setModalShow(true)}
        >Complete</button>
    </div>
  </div>
  </ListGroup.Item>
</React.Fragment>
 )

 

  
  return (
    <>
    
      <ListGroup>{TransactionsList}</ListGroup>
    </>
  );


};

