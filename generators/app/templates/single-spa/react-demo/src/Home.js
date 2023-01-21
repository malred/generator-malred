import React, { useState, useEffect } from "react";

function useToolsModule() {
  const [toolsModule, setToolsModule] = useState();
  useEffect(() => {
    // 获取公共Utils模块
    System.import("@<%= team_name %>/tools").then(setToolsModule);
  }, []);
  return toolsModule;
}
const Home = () => {
  const toolsModule = useToolsModule();
  useEffect(() => {
    let subjection = null;
    if (toolsModule) {
      // 使用公共Utils模块的方法
      toolsModule.sayHello("@<%= team_name %>/react");
      // 订阅消息,有消息就打印
      subjection = toolsModule.sharedSubject.subscribe(console.log);
    }
    // 取消订阅,防止占用资源
    return () => subjection.unsubscribe();
  }, []);
  return (
    <div>
      Home works
      <button onClick={() => toolsModule.sharedSubject.next("hello hello")}>
        发送广播
      </button>
    </div>
  );
};
export default Home;
