import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
export default function Root(props) {
  return (
    <>
      <BrowserRouter>
        <div id="navbar">
          {/* 访问不同模块的link */}
          <Link to={"/react"}>react应用</Link>
          <span>|</span>
          <Link to={"/"}>容器应用</Link>
          <span>|</span>
          <Link to={"/vue"}>vue应用</Link>
        </div>
      </BrowserRouter>
      <style jsx>{`
        #navbar {
          display: flex;
          justify-content: space-around;
          padding: 10px 0 20px 0;
          border-bottom: 1px solid #ccc;
          align-items: center;
        }
        a {
          text-decoration: none;
        }
      `}</style>
    </>
  );
}
