import { WebAuth } from 'auth0-js';

const CONFIG = require('../../config.local.json');

export const AUTH = new WebAuth({
    clientID: CONFIG.auth.client_id,
    domain: CONFIG.auth.domain,
    responseType: CONFIG.auth.response_type,
    audience: CONFIG.auth.audience,
    redirectUri: CONFIG.auth.redirect_uri,
    scope: CONFIG.auth.scope
  });