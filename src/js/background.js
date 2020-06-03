import User from './Models/User.js';

const user = User.new({name: 'otiai10'});
console.log(user.greet());