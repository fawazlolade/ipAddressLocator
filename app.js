const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('./public/'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


app.get('/result', function(req, res) {
    res.sendFile(__dirname + '/result.ejs');
})


app.post('/result', (req, res) => {

   const ipAddress = req.body.ipAddress; //gets the ip address
   var regex = /^[0-9.]+$/; //checks the input and only accepts the numbers at the beginning and end with period between
   
   if (regex.test(ipAddress)) {

    const options = {
        path: '/'+ipAddress+'/'+'json/',
        host: 'ipapi.co',
        port: 443,
        headers: { 'User-Agent': 'nodejs-ipapi-v1.02' }
      };
    
      //getting the response
      https.get(options, function(response){
          let body = '';
          
          response.on('data', function(data){
              body += data;
          });
      
          response.on('end', function(){
            const result = JSON.parse(body);
            const ipAddress = result.ip;
            const version  = result.version;
            const city = result.city;
            const region = result.region;
            const regionCode = result.region_code;
            const countryCode = result.country_code;
            const countryName = result.country_name;
            const latitude = result.latitude;
            const longitude = result.longitude;
            const countryCallingCode = result.country_calling_code;
            const countryArea = result.country_area;
            const asn = result.asn;
            const org = result.org;
            if(version, city, regionCode, countryCode, countryName, latitude, longitude, countryCallingCode, countryArea, asn, org == null) {

            res.render('result', {
                    ipAddress: 'IP address not valid',
                    version: 'N/A',
                    city: 'N/A',
                    region: 'N/A',
                    regionCode: 'N/A',
                    countryCode: 'N/A',
                    countryName: 'N/A',
                    latitude: 'N/A',
                    longitude: 'N/A',
                    countryCallingCode: 'N/A',
                    countryArea: 'N/A',
                    asn: 'N/A',
                    org: 'N/A'
                });
            }
            else { 
                res.render('result', {
                        ipAddress: ipAddress,
                        version: version,
                        city: city,
                        region:  region,
                        regionCode: regionCode,
                        countryCode: countryCode,
                        countryName: countryName,
                        latitude: latitude,
                        longitude: longitude,
                        countryCallingCode: countryCallingCode,
                        countryArea: countryArea,
                        asn: asn,
                        org: org
                    });
               
            }
            });
            
      });
    } 
    //if it does not pass the regex test, display error page
    else {
        res.sendFile(__dirname + '/error.html');
}     
})


app.listen(3000, () => console.log('server started at port 3000'));