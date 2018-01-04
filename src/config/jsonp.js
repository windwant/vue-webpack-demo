import Jsonp from "jsonp";

export default function jsonp(url,data,option){
  url += (url.indexOf("?")<0 ? "?" : "&")+param(data);
  //promise对象
  return new Promise((resolve,reject)=>{
    //resolve成功；reject失败
    Jsonp(url,option,(err,data)=>{
      if(!err){
        resolve(data);
      }else{
        reject(err);
      }
    })
  })
}


function param(data){
  var url = "";
  for(var k in data){
    var value = data[k] !== undefined ? data[k] : "";
    //es6模板字符串  `aaaa$(paramenter)bbbbb`；
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  return url ? url.substring(1) : "";
}
