import Head from "next/head";
import styles from './list.module.css'
import {promisify} from 'util';
import {readFile} from 'fs';
import {join} from 'path';
// 改造readFile为promise方法
const read = promisify(readFile);
// 接收props
export default function List({data}) {
    return <>
        <Head>
            <title>list page</title>
        </Head>
        <div className={styles.demo}>list page</div>
        <div>{data}</div>
    </>
}
/** 发送http请求的代码,这里的接口是json-server起的
 // export async function getStaticProps( ) {
//     let result = await fetch('http://localhost:9090/test?id=1',{
//         headers: {
//             // Accept: 'application/vnd.dpexpo.v1+json' //设置请求头
//         },
//         method: 'get',
//     })
//     let res = await result.json() //必须通过此方法才可返回数据
//     console.log(res)
//     return {
//         props: {
//             data: res[0] //props值传导render函数中
//         }
//     }
} */
// 有数据的静态生成
// 获取静态生成需要的数据
export async function getStaticProps() {
    let data = await read(join(process.cwd(), 'pages', '_app.js'), 'utf-8');
    console.log(data)
    return {
        // 导出到props,传递给组件
        props: {
            data
        }
    }
}