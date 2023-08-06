const bcrypt = require('bcrypt');

// hash password
exports.encryptPwd = async (password) => {
    const salt = await bcrypt.genSalt(12); // generate salt to hash password
    console.log('hash info ', password, salt);
    return await bcrypt.hash(password, salt); // now we set user password to hashed password    
}

