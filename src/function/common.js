// 全局公共方法 在main.js里引入并挂载在Vue实例下
// import common from './function/common.js'
// Vue.prototype.common = common

// 在组件中使用方法：例：this.$common.test()
export default {
    test() {
        console.log("1111");
    },
    // 生成18位订单号 时间+4位随机数，参数：new Date()
    getOrderId(str) {
        let YYYY = str.getFullYear(),
            MM = str.getMonth() + 1 < 10 ? `0` + (str.getMonth() + 1) : str.getMonth() + 1,
            DD = str.getDate() < 10 ? `0` + str.getDate() : str.getDate(),
            hh = str.getHours() < 10 ? `0` + str.getHours() : str.getHours(),
            mm = str.getMinutes() < 10 ? `0` + str.getMinutes() : str.getMinutes(),
            ss = str.getSeconds() < 10 ? `0` + str.getSeconds() : str.getSeconds();
        let dateStr = `${YYYY}${MM}${DD}${hh}${mm}${ss}`
        let num = Math.floor(Math.random() * (9999 - 1000)) + 1000;
        let id = `${dateStr}${num}`
        return Number(id)
    },
    // 用户地址id，参数：new Date()，返回一串number类型的数字，例：20190628153528
    getId(str) {
        let YYYY = str.getFullYear(),
            MM = str.getMonth() + 1 < 10 ? `0` + (str.getMonth() + 1) : str.getMonth() + 1,
            DD = str.getDate() < 10 ? `0` + str.getDate() : str.getDate(),
            hh = str.getHours() < 10 ? `0` + str.getHours() : str.getHours(),
            mm = str.getMinutes() < 10 ? `0` + str.getMinutes() : str.getMinutes(),
            ss = str.getSeconds() < 10 ? `0` + str.getSeconds() : str.getSeconds();
        let id = `${YYYY}${MM}${DD}${hh}${mm}${ss}`
        return Number(id)
    },
    getCookie(cookie_name) {
        var allcookies = document.cookie;
		//索引长度，开始索引的位置
        var cookie_pos = allcookies.indexOf(cookie_name);

        // 如果找到了索引，就代表cookie存在,否则不存在
        if (cookie_pos != -1) {
            // 把cookie_pos放在值的开始，只要给值加1即可
            //计算取cookie值得开始索引，加的1为“=”
            cookie_pos = cookie_pos + cookie_name.length + 1; 
            //计算取cookie值得结束索引
            var cookie_end = allcookies.indexOf(";", cookie_pos);
            
            if (cookie_end == -1) {
                cookie_end = allcookies.length;
            }
            //得到想要的cookie的值
            var value = unescape(allcookies.substring(cookie_pos, cookie_end)); 
        }
        return value;
    }
}