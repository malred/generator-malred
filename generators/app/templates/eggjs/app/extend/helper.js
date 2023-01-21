const crypto = require('crypto');
const _ = require('lodash');
/**
 * 对字符串进行md5加密
 * @param {未加密字符串} str 
 */
exports.md5 = str => {
    return crypto.createHash('md5').update(str).digest('hex')
}
/**
 * 导出lodash
 */
exports._ = _