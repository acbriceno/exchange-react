import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";
import {NavBar} from "./navbar.js"
const accessRole = "CUSER"
export const CUSERContainer = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.getRole() === accessRole) {
          return (
            <div> 
            <div className="">
              <NavBar {... props} />
            </div>
              <Component {...props} />
            </div>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
