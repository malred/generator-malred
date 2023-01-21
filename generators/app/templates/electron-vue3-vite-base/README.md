# public 文件夹下有data.json,可以安装json-server来启动虚拟接口
   
npm i -g json-server 
或
yarn add global json-server
   
# 根目录下的 plopfile.js 用于生成文件    

可以把有重复逻辑的代码文件封装到 plop-templates ,让它自动生成
使用 plopfile.js 的脚本在 public/plop.bat 里,windows下在文件管理器直接点击运行