import Provider from 'oidc-provider'
import express from 'express'

import jwks from './config/jwks.js'
import routes from './config/routes.js'

async function findAccount(ctx, sub, token) {
  try {
    const user = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'emilys',
        password: 'emilyspass',
        expiresInMins: 30, // optional, defaults to 60
      }),
      credentials: 'include', // Include cookies (e.g., accessToken) in the request
    })
    const info = await user.json()
    console.log('user info >>>>', info)

    // @param ctx - koa request context
    // @param sub {string} - account identifier (subject)
    // @param token - is a reference to the token used for which a given account is being loaded,
    //   is undefined in scenarios where claims are returned from authorization endpoint
    return {
      accountId: sub,
      // @param use {string} - can either be "id_token" or "userinfo", depending on
      //   where the specific claims are intended to be put in
      // @param scope {string} - the intended scope, while oidc-provider will mask
      //   claims depending on the scope automatically you might want to skip
      //   loading some claims from external resources or through db projection etc. based on this
      //   detail or not return them in ID Tokens but only UserInfo and so on
      // @param claims {object} - the part of the claims authorization parameter for either
      //   "id_token" or "userinfo" (depends on the "use" param)
      // @param rejected {Array[String]} - claim names that were rejected by the end-user, you might
      //   want to skip loading some claims from external resources or through db projection
      async claims(use, scope, claims, rejected) {
        return { sub }
      },
    }
  } catch (e) {
    throw e
  }
}

const configuration = {
  clients: [
    {
      client_id: 'oidcCLIENT',
      client_secret: 'JYvz2hnyWqKOfNxXuwBAo2BbCdUwbMp0',
      grant_types: ['authorization_code'],
      redirect_uris: ['https://oidcdebugger.com/debug'],
      response_types: ['code'],

      //other configurations if needed
    },
  ],
  // interactions: {
  //   url(ctx, interaction) { // eslint-disable-line no-unused-vars
  //     return `/interaction/${interaction.uid}`;
  //   },
  // },
  cookies: {
    keys: ['nzC4rj8xT2HB93sIRilHLKDRC1nYiR5O'],
  },
  claims: {
    address: ['address'],
    email: ['email', 'email_verified'],
    phone: ['phone_number', 'phone_number_verified'],
    profile: [
      'birthdate',
      'family_name',
      'gender',
      'given_name',
      'locale',
      'middle_name',
      'name',
      'nickname',
      'picture',
      'preferred_username',
      'profile',
      'updated_at',
      'website',
      'zoneinfo',
    ],
  },
  features: {
    devInteractions: { enabled: false }, // defaults to true
    // deviceFlow: { enabled: true }, // defaults to false
    // revocation: { enabled: true }, // defaults to false
  },
  jwks,
  findAccount,
}

const oidc = new Provider('http://localhost:8080', configuration)

const app = express()

const __dirname = import.meta.dirname
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

routes(app, oidc)

app.use('/oidc', oidc.callback())

app.listen(8080, function () {
  console.log('OIDC is listening on port 8080!')
})
