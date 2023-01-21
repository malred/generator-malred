// 网络请求api的主文件
// 使用aixos时统一从这里获取api
// 定义接口时统一从这里导出
import { Hello } from "./test";
import { NoBase } from './noBaseUrl'

export const HelloAPI = Hello
export const NoBaseAPI = NoBase