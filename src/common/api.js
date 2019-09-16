import axios from 'axios/dist/axios.min';
var qs = require('qs');


let base = '',
    socket = '';
if(process.env.NODE_ENV === 'development') {  //本地开发环境
    base = 'http://trade.luoym.com/privateapi';
    socket = '47.103.101.78:5550';
} else if(process.env.NODE_ENV === 'testing') {  //线上测试环境
    base = '';
    socket = '';
} else if(process.env.NODE_ENV === 'production') {  //线上正式环境
    base = 'http://47.103.101.78:5555';
    socket = '47.103.101.78:5550';
}

export const BASE = base;
export const SOCKET = socket + '/api';

let header = {
    'content-type': 'application/x-www-form-urlencoded'
};

let jsonHeader = {
    'content-type': 'application/json;charset=UTF-8'
};


/**=====================================================================================
 * 公公方法
 *======================================================================================*/
export const COMMON = {
    /**
     * [description] 毫秒数转成需要的格式
     * @param  {[type]} type      [description] 1: yyyy-mm-dd. 2: yyyy-mm-dd hh:mm:ss
     * @param  {[type]} separator [description] 分隔符
     * @param  {[type]} time      [description] 毫秒数
     * @return {[type]}           [description]
     */
    formatDate: (type, separator, time) => {
        let formatdate = new Date(time),
            year = formatdate.getFullYear(),
            month = formatdate.getMonth(),
            day = formatdate.getDate(),
            hours = formatdate.getHours(),
            minute = formatdate.getMinutes(),
            second = formatdate.getSeconds();


        month = (month + 1) < 10 ? ('0' + (month + 1)) : (month + 1);
        day = day < 10 ? ('0' + day) : day;
        hours = hours < 10 ? ('0' + hours) : hours;
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;

        if(type == 1) {
            return year + separator + month + separator + day;
        } else if(type == 2) {
            return year + separator + month + separator + day + ' ' + hours + ':' + minute + ':' + second;
        } else {
            return time;
        }
    }
}

/**=====================================================================================
 * 
 *======================================================================================*/
 // login
export const API = params => {
    return axios.post(`${base}/api`, params, { headers: jsonHeader }).then(res => res.data);
    // return axios.post(`${base}/api`, qs.stringify(params), { headers: header }).then(res => res.data);
};











































 