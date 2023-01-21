import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  // 当报错时显示什么
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return <div>应用粗错了</div>;
  },
  // 获取要渲染到的dom节点
  domElementGetter: () => document.getElementById("root"),
});

export const { bootstrap, mount, unmount } = lifecycles;
