const express = require('express')
const https = require('https')
const app = express()
const port = 3000

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));



app.get('/', (req, res) => res.sendFile(`${__dirname}/signup.html`))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.post('/', function(req, res) {

    const firstName = req.body.firstname;
    const lastName = req.body.lasttname;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address : String(email),
                status : "subscribed",
                merge_fields : {
                    FNAME : String(firstName),
                    LNAME : String(lastName)
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    var url = "https://us17.api.mailchimp.com/3.0//lists/ab93a5a408"

    var option = {
        method : "post",
        auth : "jomin:d3ac4dcb988677f2232b1664bc06989a-us17"
    }


// send request to third party server API
   const request =  https.request(url, option , (response) => {
        response.on("data", (data) => {
            console.log(JSON.parse(data));

            if (response.statusCode === 200) {
                res.sendFile(`${__dirname}/success.html`)
            } else {
                res.sendFile(`${__dirname}/failure.html`)
            }
        })
    });


    request.write(jsonData);
    request.end();

  });

  app.post('/failure', function (req, res) {
    res.redirect("/");
  })

  // API key 
  // d00117d43cabeff0a0b0eef615ac273c-us17

  // id
  // ab93a5a408

  // https://us17.api.mailchimp.com/3.0//lists/ab93a5a408