const bcrypt = require('bcrypt');
const password = 'testpassword';
bcrypt.hash(password, 10)
    .then(hash => {
        console.log('Hash successful:', hash);
        return bcrypt.compare(password, hash);
    })
    .then(match => {
        console.log('Compare successful:', match);
        process.exit(0);
    })
    .catch(err => {
        console.error('Bcrypt error:', err);
        process.exit(1);
    });
