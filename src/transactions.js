import React, {useRef, useEffect, useState} from "react";
import auth from "./auth";
import roleManager from './RoleManager'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import {gql, useQuery} from '@apollo/client'

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

export const TransactionsPage = props => {

  const {loading: transactionLoading, error:transactionError, data:transactionData} = useQuery(getTransactions)
 const {loading:currencyLoading, error:currencyError, data:currencyData} = useQuery(getCurrencies)
 const [state, setState] = useState(initialState)
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
  
 const TransactionsList = state.transactions.map((transaction) =>
<React.Fragment key={transaction.id}>
   <ListGroup.Item key={transaction.id}> 

  <div className="row">
    <div className="col-sm-6">
     <h3>{"User: " + transaction.userID}</h3> 
     <p>{"Amount: " + transaction.amount} {" "} {getCurrencyName(transaction.currencyID)} </p>
     <p>  {"Transaction Type: " + transaction.type} {"   "} {"Status: " + transaction.status} </p>
    </div>
    <div className="col-sm-6" >
        <button  className="btn btn-danger btn-sm btn-space">Cancel</button>
        <button  className="btn btn-success btn-sm">Complete</button>
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

