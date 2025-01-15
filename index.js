import Provider from 'oidc-provider'
import express from 'express'

import { configuration } from './config/configuration.js'
import routes from './config/routes.js'

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
