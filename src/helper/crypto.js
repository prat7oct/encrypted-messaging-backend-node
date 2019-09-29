const cryptoJs = require("crypto-js");
const key = cryptoJs.enc.Hex.parse("testing123456789");
const iv = cryptoJs.enc.Hex.parse("12345testing");

exports.encryption = msg => {
    let encrypted = cryptoJs.AES.encrypt(msg, key, {
        iv: iv,
        mode: cryptoJs.mode.CTR,
        padding: cryptoJs.pad.NoPadding
    });
    return encrypted.toString();
};

exports.decryption = msg => {
    var plaintext = cryptoJs.AES.decrypt(msg, key, {
        iv: iv,
        mode: cryptoJs.mode.CTR,
        padding: cryptoJs.pad.NoPadding
    });
    return plaintext.toString(cryptoJs.enc.Utf8);
};
