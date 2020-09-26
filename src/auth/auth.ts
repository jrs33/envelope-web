import { WebAuth } from 'auth0-js';

export const AUTH = new WebAuth({
    clientID: process.env.AUTH_CLIENT_ID,
    domain: process.env.AUTH_DOMAIN,
    responseType: process.env.AUTH_RESPONSE_TYPE,
    audience: process.env.AUTH_AUDIENCE,
    redirectUri: process.env.AUTH_REDIRECT_URI,
    scope: process.env.AUTH_SCOPE
  });