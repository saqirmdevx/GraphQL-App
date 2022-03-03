"use strict";
// Basic config for our app
// Database configuration
var DatabaseConfig;
(function (DatabaseConfig) {
    DatabaseConfig.IP = "localhost";
    DatabaseConfig.username = "root";
    DatabaseConfig.password = "admin";
    DatabaseConfig.port = 3306;
    DatabaseConfig.database = "apolloGraphql";
})(DatabaseConfig || (DatabaseConfig = {}));
