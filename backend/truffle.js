module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/jquery-1.12.4.min.js",
      "javascripts/app.js",
      "javascripts/functions.js"

    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  rpc: {
    host: "blockhack.northeurope.cloupapp.azure.com",
    port: 8545
  }
};
