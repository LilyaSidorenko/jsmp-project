switch (process.env.NODE_ENV) {
    case 'prod':
    case 'production':
        module.exports = require('./webpack.prod.config.js')({env: 'production'});
        break;
    case 'test':
    case 'testing':
        module.exports = require('./karma.conf')({env: 'test'});
        break;
    case 'dev':
    case 'development':
    default:
        module.exports = require('./webpack.dev.config.js')({env: 'development'});
}