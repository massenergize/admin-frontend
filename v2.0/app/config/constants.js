/**
 * This file contains constants to be used throughout the application
 */

const {
  IS_LOCAL, IS_PROD, IS_CANARY, BUILD_VERSION
} = require('./config.json');
const APP_NAME = 'MassEnergize Administration';

//  ---- setting  API routes
let API_HOST = 'https://api.massenergize.org';
if (IS_LOCAL) {
  API_HOST = 'http://localhost:8000';
} else if (IS_PROD) {
  API_HOST = 'https://api.massenergize.org';
} else if (IS_CANARY) {
  API_HOST = 'https://api-canary.massenergize.org';
} else {
  // IS_DEV
  API_HOST = 'https://api-dev.massenergize.org';
}

//  ---- setting  Firebase Config routes
let FIREBASE_CONFIG = {};
if (IS_PROD || IS_CANARY) {
  FIREBASE_CONFIG = {
    apiKey: 'AIzaSyDgSkiZGtco0b8ntN9Yo7U-urRzXhQNOo8',
    authDomain: 'massenergize-prod-auth.firebaseapp.com',
    databaseURL: 'https://massenergize-prod-auth.firebaseio.com',
    projectId: 'massenergize-prod-auth',
    storageBucket: 'massenergize-prod-auth.appspot.com',
    messagingSenderId: '738582671182',
    appId: '1:738582671182:web:1cb9c3353cff73a4e3381f',
    measurementId: 'G-4FPTY0R9S6'
  };
} else {
  FIREBASE_CONFIG = {
    apiKey: 'AIzaSyBjcwjC_0H1bgGKqPyqKnbWaGmAtzc4BJQ',
    authDomain: 'massenergize-auth.firebaseapp.com',
    databaseURL: 'https://massenergize-auth.firebaseio.com',
    projectId: 'massenergize-auth',
    messagingSenderId: '72842344535',
    appId: '1:72842344535:web:9b1517b1b3d2e818'
  };
}


//  ---- setting  Community Portal routes
let PORTAL_HOST = 'https://community.massenergize.org';
if (IS_LOCAL) {
  PORTAL_HOST = 'http://localhost:3000';
} else if (IS_PROD) {
  PORTAL_HOST = 'https://community.massenergize.org';
} else if (IS_CANARY) {
  PORTAL_HOST = 'https://community-canary.massenergize.org';
} else {
  // IS_DEV
  PORTAL_HOST = 'https://community-dev.massenergize.org';
}

//  ---- setting Sandbox routes
let SANDBOX_PORTAL_HOST = 'https://sandbox.community-dev.massenergize.org';
if (IS_LOCAL) {
  SANDBOX_PORTAL_HOST = 'http://localhost:3000';
} else if (IS_PROD) {
  SANDBOX_PORTAL_HOST = 'https://sandbox.community.massenergize.org';
} else if (IS_CANARY) {
  SANDBOX_PORTAL_HOST = 'https://sandbox.community-canary.massenergize.org';
} else {
  // IS_DEV
  SANDBOX_PORTAL_HOST = 'https://sandbox.community-dev.massenergize.org';
}


module.exports = {
  IS_LOCAL,
  IS_PROD,
  IS_CANARY,
  API_HOST,
  APP_NAME,
  FIREBASE_CONFIG,
  PORTAL_HOST,
  SANDBOX_PORTAL_HOST,
  BUILD_VERSION
};
