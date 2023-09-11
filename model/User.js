const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter);

const User = {};

User.userLogin = (email, callback) => {
    const user = db.get('users').find({ email }).value();
    callback(user);
   }; 

User.signUpUser = (email, hashedPassword) => {
    db.get("users")
        .push({
            id: db.get("users").value().length + 1,
            password: hashedPassword,
            email,
        })
    .write();
};
   

module.exports = User;