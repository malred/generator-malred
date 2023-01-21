// 如果不想使用axios配置的baseurl 
import axios from "axios" 
const myBaseUrl = "http://localhost:9000"

export const NoBase = (data) =>
    axios({
        // json-server的post是新增
        method: "POST",
        url: myBaseUrl + "/user",
        data,
        headers: {
            // 传递表单
            "Content-Type": "application/json",
        },
    });