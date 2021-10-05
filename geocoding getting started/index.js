let nodeGeocoder = require('node-geocoder');
 
let options = {
  provider: 'openstreetmap'
};
 
let geoCoder = nodeGeocoder(options);
geoCoder.geocode('Khandagiri, Bhubaneswar, Odisha, 751019, India')
  .then((res)=> {
    console.log(res[0]);
  })
  .catch((err)=> {
    console.log(err);
  });