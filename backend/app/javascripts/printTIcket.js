
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

window.onload = function() {
  
  console.log('Assemble bits needed to display ticket');

  var id = getUrlParameter('id');

  console.log('Retrieved id: ' + id);

  $('#qrcode').append($('<img>').attr('src', "http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=" + id));

  //jquery('#qrcode').qrcode("this plugin is great");
  // jQuery('#qrcode').qrcode({
  //   text : "this plugin is great"
  // });

  //$('#qrcode').qrcode({width: 120,height: 120, text: "https://github.com/jeromeetienne/jquery-qrcode"});

  return false;
}
