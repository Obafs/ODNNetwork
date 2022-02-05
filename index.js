const tokenFactory = require("./app/src/Methods");
const tokenfactory = new tokenFactory();
const express = require("express");
const app = new express();
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: "https://network.steigenberg.in",
  consumerKey: "ck_9e0dd6acc8db39ecc3e648a5c1c40bf41ba89cd1",
  consumerSecret: "cs_115c224a0053cade06de181cccee81bb66827047",
  version: "wc/v3",
});

app.use(express.json());

app.get("/orders", async (req, res) => {
  try {
    const ords = await api.get("orders");
    res.send(ords.data);
    console.log(ords.data);
  } catch (error) {
    console.error(error);
  }
  //   api
  //     .get("orders")
  //     .then((response) => {
  //       console.log(response.data);
  //       res.send(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data);
  //     });
});

// app.get("/balance", async (req, res) => {
//   try {
//     const { tkn, owner } = req.body;
//     const bals = await tokenfactory.balance(tkn, owner);
//     res.send(bals.events.balz.returnValues[0]);
//     console.log(bals);
//   } catch (error) {
//     console.error(error);
//   }
// });

app.get("/balance", (req, res) => {
  const { tkn, owner } = req.body;
  tokenfactory
    .balance(tkn, owner)
    .then((bals) => res.send(bals.events.balz.returnValues[0]))
    .catch((error) => console.error(error));
});

app.get("/name", (req, res) => {
  return res.send("App name");
});

//app.get("/list", async (req, res) => {
// try {
//   const lists = await tokenfactory.listToken();
//   res.send(lists.events.listT.returnValues[0]);
//   console.log(lists);
// } catch (error) {
// console.error(error);
// }
//});

app.get("/list", (req, res) => {
  tokenfactory
    .listToken()
    .then((list) => res.send(list.events.listT.returnValues[0]))
    .catch((err) => res.send(err));
});

//const jwtCheck = jwt({
// secret: jwks.expressJwtSecret({
//  cache: true,
// rateLimit: true,
// jwksRequestsPerMinute: 5,
// jwksUri: "https://dev-lfadzurw.us.auth0.com/.well-known/jwks.json",
//}),
//audience: "http://localhost:8080/",
//issuer: "https://dev-lfadzurw.us.auth0.com/",
//algorithms: ["RS256"],
//});

//app.use(jwtCheck);

app.get("/authorized", function(req, res) {
  res.send("Secured Resource");
});

app.post("/fulfill", async (req, res) => {
  try {
    const { tkn, to, amount } = req.body;
    const confirm = await tokenfactory.send(tkn, to, amount);
    res.send(confirm);
  } catch (error) {
    console.log(error);
  }
});

app.listen(8080, () => console.log("listening on port 8080"));
