import {useQuery, gql} from '@apollo/client'
import {Button, Card, Modal} from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
import React, {useState, useEffect} from 'react'
//import Pass from './pass'
import CardDeck from 'react-bootstrap/CardDeck'
import {DepositPage} from './deposit'
import {WithdrawPage} from './withdraw'
const getWalletCase = gql`
{
  getWalletCase{
    id
    userID
    wallets{
    	name
    	currency
    	balance
    	unavailableAmount
    }
  }
}
`

function DepositTransaction(props) {
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
            <DepositPage className="text-center" currencyID={props.currencyID} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function WithdrawTransaction(props) {
  return (
    <Modal
      {...props}
    size="sm"
      centered
    >
       <Modal.Header closeButton>
        <Modal.Title className="text-center">
          Withdraw
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
            <WithdrawPage className="text-center" currencyID={props.currencyID} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const initialState = {
  walletIds: [],
  loadState: false,
  walletListState: false,
  depositCurrency:[]
}
function WalletCasePage (props){ 
  const {loading, error, data} = useQuery(getWalletCase)
  const [state, setState] = useState(initialState)
  const [modalShow, setModalShow] = useState(false);
    const [withdrawModalShow, setWithdrawModalShow] = useState(false);
  useEffect(() =>{
      setState(state=>{

        if(!loading){
          console.log(data.getWalletCase.wallets)
        return{
          ...state,
          walletIds: data.getWalletCase.wallets,
          loadState: true
        }
        }
      })
  },[data])

  if(loading){return (<p>loading...</p>)}
  if(error){return (<p> Error...</p>)}
 
 
 
 
 const deposit = e => {
     e.preventDefault()
     console.log(e)
     initialState.depositCurrency.push(e.target.value)
	state.depositCurrency= [e.target.value]
	
  }
  
   const withdraw = e => {
     props.history.push("/casa");

  }
  


  
  const walletsList = data.getWalletCase.wallets.map((wallet) => {
    return(
    <>
   
   <Card>
    <Accordion.Toggle as={Card.Header} eventKey={wallet.currency}>
      {wallet.name}
    </Accordion.Toggle>
    <Accordion.Collapse eventKey={wallet.currency}>
      <Card.Body> 
      
		<div className="row"> 
	
			<div className="col-md-4">
				{"Balance: " + wallet.balance} 
				<p>
			 	{"Unavailable Amount: " + wallet.unavailableAmount}
			</p>
        
			</div>
			
			<div className="col-md-8 floatR">
				 <Button size="sm" className="btn-space btn-success floatR" value={wallet.currency}
				onClick={() => setModalShow(true)}
				>Trade</Button>
			 <Button size="sm" className="btn-space btn-success floatR" value={wallet.currency}
				onClick={() => setModalShow(true)}
				>Deposit</Button>
			
				   <Button size="sm" className="btn-space floatR" value={wallet.currency}
				onClick={() => setWithdrawModalShow(true)}
				>Withdraw</Button>
			</div>
			
	
		
		</div>
        
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  
</>


    )
  })

  return (
    <>
     <DepositTransaction
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      
      <WithdrawTransaction
        show={withdrawModalShow}
        onHide={() => setWithdrawModalShow(false)}
      />
      
    <div className="container-fluid noP">
   <h2 className="white-text  text-center primaryTextColor "> Wallets </h2>
 <hr className=""></hr>
      
  </div>
  <div className="container">
 

  <Accordion >
  {walletsList}
  </Accordion>

  </div>
 
    </>
  )
}

export default WalletCasePage
