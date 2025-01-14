import Provider from 'oidc-provider'
import express from 'express'

const configuration = {
  clients: [{
     client_id: "oidcCLIENT",      
     client_secret: "Some_super_secret",      
     grant_types: ["authorization_code"],      
     redirect_uris: [ "https://oidcdebugger.com/debug"], 
     response_types: ["code"],  
       
   //other configurations if needed
  }],
  pkce: {
    required: () => false,
  },
};

const oidc = new Provider('http://localhost:8080', configuration)

const app = express();

app.use("/oidc",oidc.callback());

app.listen(8080, function () {
  console.log('OIDC is listening on port 8080!');
});
