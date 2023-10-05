var sm = require('service-metadata');


var qmanager = sm.getVar('var://service/routing-url');
var queueConfig='?RequestQueue=DP_IN;ReplyQueue=DP_OUT;Reply-To=DP_OUT';
var routing_URL=qmanager+queueConfig;



// Set the modified MQMD header in the output message
sm.setVar('var://service/routing-url', routing_URL);

