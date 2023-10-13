ld = {};
ld.config = {};
ld.config.proxy = true;


ld.getType = function getType(obj){
  return Object.prototype.toString.call(obj);
}

ld.proxy = function proxy(obj, objName){
  // obj: 原始对象
  // objName: 原始对象的名字

  if(!ld.config.proxy){
    return obj;
  }

  let handler = {
    get: function(target, prop, receiver){
      let result;
      try{ // 防止报错
        result = Reflect.get(target, prop, receiver);
        let type = ld.getType(result);
        if(result instanceof Object){
          // 递归代理
          result = ld.proxy(result, `${objName}.${prop.toString()}`)
        }
      }catch(e){

      }
      return result;
    }
  }

  return new Proxy(obj, handler)
}


user = {
  "username": "xml",
  "info": {
    "name": "小明",
    "age": 12
  }
}
user = ld.proxy(user, "user")
console.log(user.username);
console.log(user.info.name);