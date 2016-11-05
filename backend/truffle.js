module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "functions.js": [
      "javascripts/functions.js"
    ],
    "jquery-1.12.4.min.js": [
      "javascripts/jquery-1.12.4.min.js"
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
