export function randomWord(randomFlag, min, max) {
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (let i = 0; i < range; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}

/**
 * 解决JSON.stringify和JSON.parse不能转换RegExp的问题
 * @author Junan
 * @see JSON.parse();JSON.stringify()
 */

/**
 * json字符串转json对象
 * @param { String } jsonStr json字符串
 */
 export function parseJson(jsonStr){
    return JSON.parse(jsonStr, (k, v) => {
      try{
        // 将正则字符串转成正则对象
        if (eval(v) instanceof RegExp) {
            debugger
          return eval(v);
        }
      }catch(e){
        // nothing
      }
  
      return v;
    });
  }
  
  /**
   * json对象转json字符串
   * @param { Object } json json对象
   */
  export function stringifyJson(json){
    return JSON.stringify(json, (k, v) => {
      // 将正则对象转换为正则字符串
      if(v instanceof RegExp){
        return v.toString();
      }
  
      return v;
    },2);
  }
  