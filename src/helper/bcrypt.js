var bcrypt = require('bcryptjs');

exports.cryptPassword = async password => bcrypt.hash(password, await bcrypt.genSalt(10));

exports.comparePassword = async (plainPass, hashword) => await bcrypt.compare(plainPass, hashword);