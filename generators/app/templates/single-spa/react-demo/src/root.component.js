import React from "react";
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom"; 
import About from "./About";
import Home from "./Home";
export default function Root(props) {
  // basename就是该router下每个路由的url前缀
  return (
    <BrowserRouter basename="/react"> 
      <div>
        <Link to={"/home"}>Home</Link>
        <Link to={"/about"}>About</Link>
      </div>
      <Switch>
        <Route path={"/home"}>
          <Home />
        </Route>
        <Route path={"/about"}>
          <About />
        </Route>
        <Route path={"/"}>
          <Redirect to={"/home"} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
