import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './Admin';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, createHttpLink } from '@apollo/client';
import './style.css'
import { LoginPage } from "./login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {AdminContainer} from './AdminContainer'
import {CUSERContainer} from './CUserContainer'
import WalletCasePage from './WalletCase'
import { setContext } from '@apollo/client/link/context';
import {RegisterPage} from './register'
import HomePage from './home'
import {HomeContainer} from './HomeContainer'
import {LoginContainer} from './LoginContainer'
import {RegisterContainer} from './RegisterContainer'
import { onError } from "@apollo/client/link/error";
import {ApolloLink} from "apollo-link"
import {Footer} from './footer.js'


const httpLink = createHttpLink({uri: 'http://localhost:5002', credentials: 'include'}) 

var errorSwitch = true

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "x-token": token ? `${token}` : "",
    }
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) {
    errorSwitch = false
    load()
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),  
  cache: new InMemoryCache()
});



function AppController() {
  return (
    <div className="AppController">
      <Switch>
       <HomeContainer exact path="/" component={HomePage}/> 
        <RegisterContainer exact path ="/register" component={RegisterPage}/>
        <LoginContainer exact path="/login" component={LoginPage} />
        <AdminContainer exact path="/admin" component={Admin}/>
        <CUSERContainer exact path="/wallets" component={WalletCasePage} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
     <Footer />
    </div>
  );
}



function ErrorAppController() {
  return (
    <div className="ErrorAppController">
      <Switch>
       <Route exact path="/" component={() => "Server Down"}/> 
       <Route path="*" component={() => "404 NOT FOUND Server Down"} />
      </Switch>
    </div>
  );
}

const load = () =>{
if(errorSwitch){
ReactDOM.render(
  <ApolloProvider client={client}>
  <BrowserRouter>
    <AppController />
  
  </BrowserRouter>
  </ApolloProvider>,
  rootElement
);
}else{
ReactDOM.render(
  <ApolloProvider client={client}>
  <BrowserRouter>
    <ErrorAppController />
  
  </BrowserRouter>
  </ApolloProvider>,
  rootElement
);

}

}
const rootElement = document.getElementById("root");
load()

