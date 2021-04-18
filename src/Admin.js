import React from 'react'
import {useQuery, gql } from '@apollo/client'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import {Accordion, Tab, Row, Col, Nav} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import auth from './auth'
import {NavBar} from './navbar.js'
import {CreateCurrencyPage} from './createCurrency'
import {CurrenciesPage} from './currency'
import {TransactionsPage} from './transactions'
function Admin(props) {

  return (
   <>
    <Jumbotron className="noP secondaryGradient">
 <NavBar {...props}/>
      <h2 className="text-center white-text">Exchange Administrative Panel</h2>
    <br></br>
    <br></br>
        <div>
          </div>
    </Jumbotron>
<div className="row">
    <div className="col-md-12 someP">
 


 <Tab.Container id="left-tabs-example " defaultActiveKey="head">
  <Row>
    <Col sm={3} className="">
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link className=" " eventKey="head">Dashboard</Nav.Link>
        </Nav.Item>

        <Nav.Item className="white-text">
          <Nav.Link eventKey="currencyManagement" >Currency Management</Nav.Link>
        </Nav.Item>
   <Nav.Item>
          <Nav.Link eventKey="transactionManagement">Transaction Management</Nav.Link>
        </Nav.Item>
          


    </Nav>
    </Col>
    <Col sm={9}>
      <Tab.Content className="">
        <Tab.Pane eventKey="currencyManagement">

    <Accordion >
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="0">
      Create Currency
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
     <Card.Body> <CreateCurrencyPage />  </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="1">
      Currencies
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="1">
      <Card.Body> <CurrenciesPage />  </Card.Body>

    </Accordion.Collapse>
  </Card>


  </Accordion>
    </Tab.Pane>
        <Tab.Pane eventKey="transactionManagement">
    <Accordion >
   <Card>
    <Accordion.Toggle as={Card.Header} eventKey="2">
      Transactions
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="2">
      <Card.Body> <TransactionsPage /> </Card.Body>
    </Accordion.Collapse>
  </Card>
  

  </Accordion>
        </Tab.Pane>
<Tab.Pane eventKey="head">
    
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>

    </div>

</div>
    </>
  );
}

export default Admin;

