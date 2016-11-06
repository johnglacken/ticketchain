module.exports = {
  build: {
    "index.html": "index.html",
    "printTicket.html": "printTicket.html",
    "app.js": [
      "javascripts/jquery-1.12.4.min.js",
      "javascripts/app.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  rpc: {
    host: "blockhack.northeurope.cloudapp.azure.com",
    port: 8545
  }
};
