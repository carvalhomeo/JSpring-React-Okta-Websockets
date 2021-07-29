// eslint-disable-next-line
export default {
  oidc: {
    clientId: process.env.CLIENT_ID,
    issuer: process.env.ISSUER,
    redirectUri: `${window.location.origin}/login/callback`,
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: process.env.OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  resourceServer: {
    messagesUrl: "http://localhost:8080/hello",
  },
};
