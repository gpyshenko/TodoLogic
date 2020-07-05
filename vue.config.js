const path = require('path');

const getPath = (value) => path.resolve(__dirname, value);

module.exports = {
	productionSourceMap: false,
	configureWebpack: {
		devServer: {
			port: 3000
		},
		resolve: {
			alias: {
                'views': getPath('./src/views'),
                'components': getPath('./src/components'),
                'mixins': getPath('./src/mixins'),
                'utils': getPath('./src/utils'),
                'store': getPath('./src/store'),
                'router': getPath('./src/router'),
                'data': getPath('./src/data'),
                'assets': getPath('./src/assets'),
                'img': getPath('./src/assets/img')
			}
		}
	}
};
