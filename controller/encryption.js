const CryptoJS = require("crypto-js");

const EncryptStr = (str) => {
  return CryptoJS.AES.encrypt(str, process.env.CRYPTO_SECRET).toString();
};

const DecryptStr = (str) => {
  var bytes = CryptoJS.AES.decrypt(str, process.env.CRYPTO_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { EncryptStr, DecryptStr };
