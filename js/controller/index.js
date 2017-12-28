'use strict';

// var angular = require('angular');

angular
    .module('elixibilitasApp')
    .controller("benchController", require('./benchController'));
angular
	.module('elixibilitasApp')
	.controller("communityController", require('./communityController'));
angular
    .module('elixibilitasApp')
    .controller("homeController", require('./homeController'));
angular
    .module('elixibilitasApp')
    .controller("mainController", require('./mainController'));
angular
    .module('elixibilitasApp')
    .controller("searchController", require('./searchController'));
angular
	.module('elixibilitasApp')
	.controller("statsController", require('./statsController'));
angular
	.module('elixibilitasApp')
	.controller("toolController", require('./toolController'));
angular
	.module('elixibilitasApp')
	.controller("toolDetailsController",  require('./toolDetailsController'));
