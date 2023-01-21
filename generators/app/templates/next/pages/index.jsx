import Link from "next/link";
import Head from "next/head";

export default function Home() {
    return <>
        <Head>
            {/*修改网页标题*/}
            <title><%= projname %></title>
        </Head>
        <div>
            <div><%= projname %></div>
            {/* 跳转路由 */}
            <Link href='/list' className={'link'}>to list page</Link>
            <br/>
            {/* public下的文件可以作为静态资源 */}
            {/* 访问静态资源 http://localhost:3000/images/1.jpg */}
            <img src="/images/1.jpg" className={'demo'}/>
        </div>
        <style jsx>{`
            .demo{
                width: 300px;
            } 
        `}</style>
    </>
}