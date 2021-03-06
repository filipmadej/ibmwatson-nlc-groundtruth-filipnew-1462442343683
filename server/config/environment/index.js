/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var env = process.env.NODE_ENV || 'development';

// All configurations will extend these options
// ============================================
var all = {
  env : env,

  // Root path of server
  root : path.normalize(__dirname + '/../../..'),

  // Server port
  port : process.env.PORT || 9000,

  // Secret for session, you will want to change this and make it an environment variable
  secrets : {
    cookie : process.env.COOKIE_SECRET || 'ibmwatson-nlc-groundtruth-cookie-secret',
    session : process.env.SESSION_SECRET || 'ibmwatson-nlc-groundtruth-session-secret'
  },

  // Default values for VCAP, to be used with node cfenv if not present
  vcap : {
    application : null,
    services : null
  },

  endpoints : {
      auth : 'https://ibmwatson-nlc-tools.mybluemix.net/auth',
      cloudfoundry : 'https://api.ng.bluemix.net',
      bluemix : 'https://console.ng.bluemix.net',
      classifier: 'https://gateway.watsonplatform.net/natural-language-classifier/api'
  },

  // Cypher key used to encrypt sensitive values in session
  cryptoKey: process.env.CRYPTO_KEY || 'ibmwatson-nlc-groundtruth-cryptkey',

  // Session timeout. Default 24 hours
  sessionTimeout: process.env.SESSION_TIMEOUT || 86400

};

var customEnv = path.resolve(__dirname, env + '.js');

var custom = {};
try {
    // Query the entry
    fs.lstatSync(customEnv);

    custom = require(customEnv);
}
catch (e) {
    custom = {};
}

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  custom);
