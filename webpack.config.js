var webpack = require('webpack');
    module.exports = {
        context: __dirname + '/js',
        entry: {
            app: './app.js',
            vendor: ['angular']
        },
        output: {
            path: __dirname + '/webpack',
            filename: '[name].js'
        },

    };
