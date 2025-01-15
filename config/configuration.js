import jwks from './jwks.js'
import { findAccount } from './find-account.js'

export const configuration = {
  clients: [
    {
      client_id: 'oidcCLIENT',
      client_secret: 'JYvz2hnyWqKOfNxXuwBAo2BbCdUwbMp0',
      grant_types: ['authorization_code'],
      redirect_uris: ['https://oidcdebugger.com/debug', 'http://localhost:3000/signin-callback'],
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
