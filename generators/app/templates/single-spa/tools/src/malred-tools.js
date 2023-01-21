import { ReplaySubject } from "rxjs";
export function sayHello(who) {
  // who是调用该方法的应用名称
  console.log(`%c${who} sayHello`, "color:skyblue");
}

/**
 * 数据发布中心
 */
export const sharedSubject = new ReplaySubject();
