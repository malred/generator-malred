import { useRouter } from "next/router";

// http://localhost:3000/post/2
export default function Post({ data }) {
  const router = useRouter();
  // 判断fallback是否为true,为true就生成
  // 当渲染完成,会继续向下运行
  if (router.isFallback)
    // 返回等待渲染时的页面
    return <div>loading</div>;
  return (
    <div>
      <span>{data.id}</span>
      <span>{data.title}</span>
    </div>
  );
}

// 返回用户可以访问的所有路由参数
export async function getStaticPaths() {
  // 自己加的,获取所有可获得的id(实际开发要从后端获取)
  let result = await fetch("http://localhost:9090/ids", {
    method: "get",
  });
  let res = await result.json(); //必须通过此方法才可返回数据
  return {
    // 可以访问id=1和2的数据
    // paths: [{params: {id: "1"}}, {params: {id: "2"}}],
    paths: res,
    fallback: true,
  };
}

// 返回路由参数对应的具体数据
export async function getStaticProps({ params }) {
  /*
        switch (id) {
            case "1":
                data = {id: "1", title: 'hello'}
                break
            case "2":
                data = {id: "2", title: 'world'}
                break;
            default:
                data = {}
        }*/
  // 自己加的,根据id获取数据
  const id = params.id;
  let result = await fetch(`http://localhost:9090/test/${id}`, {
    method: "get",
  });
  let res = await result.json(); //必须通过此方法才可返回数据
  // console.log(res)
  if (id === "3") res = { id: "3", title: "hello world" };
  return {
    props: { data: res },
  };
}
