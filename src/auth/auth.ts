import { WebAuth } from 'auth0-js';

const CONFIG = require('../../config.local.json');

export const AUTH = new WebAuth({
    clientID: CONFIG.auth.client_id,
    domain: CONFIG.auth.domain,
    responseType: 'token id_token',
    audience: 'https://envelope-api.moneyme.com',
    redirectUri: 'http://localhost:8081',
    scope: 'openid profile read:envelopes create:envelopes read:transactions create:transactions'
  });