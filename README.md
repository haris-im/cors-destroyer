> [!WARNING]  
> The script is meant to request from a website that allows outside requests to a website that has cors enabled (github disallows it's own scripts to go somewhere else therefore executing any example on this repo will simply not work. If you wish to test them go to any website that allows them i.e https://www.google.com).

# Cors Destroyer
## The new URL is here! 
- For any old member, the public resource wasn't working now it's back you may use the service without hosting one of your own. Thank you for your patience!

#### Ever wanted to make a request from front end to some server and you've had those annoying errors "Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://google.com/. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing)." pop up? Well no more with the Cors destroyer, it will make requests in your behalf and return the response back to you.

## The version above has been hosted on the URL: 
Endpoint: https://cors-destroyer.vercel.app/api 

### You may use the URL above or host your own both will be explained in this readme, if you host without changing the code (mind you you must change the port if your server uses a different port) the steps to using it will be exactly the same, you must check Section 2 for any instructions incase of any updates it may be updated there, for now the steps are relatively simple.

## Section 1, Instructions on usage: 
For the sake of keeping this simple, this example will use the url mentioned above however the steps are exactly the same using your own URL

You can check if the URL is first up by simply going to the endpoint, which should respond with: "Hello, you are not using this correctly if you are here.", if this does not show up then the service is down (please alert me at haris.k.ismaili@gmail.com).

# Quick explanation: by "Primary server" I'm referring to the hosted server either the URL mentioned above or the one you've personally hosted, and by "Desired target" we refer to the target you're trying to reach i.e https://google.com

To use the service you must make a POST request to the endopint + /req, here's an example then we will break it down
```js
fetch('https://cors-destroyer.vercel.app/api', {
    method: "POST",
    headers: {'Content-Type': 'text/plain'},
    body: JSON.stringify({
        method: 'POST', 
        url: 'https://google.com', 
        headers: { 
            'Content-Type': 'application/json' 
        }, 
        body: JSON.stringify({
            message: "Heyo there"
        })
    })
}).then(resp => resp.json()).then(resp => console.log(resp)).catch(err => console.log(err));
```

In this example you may notice 2 things, 1st. Items outside body are set and never change, 2nd. Items inside the first body are the request you're wanting to make. 

1. You must do a POST request to Endpoint + /req which is the request endpoint
2. Your initial headers which are the primary server's headers must include "Content-Type: text/plain" this is a requirement, if you do not have this it will not work.
3. The JSON string body, you must add the whole body as a json string which should include the following:
- method: String, The method type you wish to send to the desired target
- url: String, The url of the desired target i.e https://google.com
- headers?: Object, A key value pair of headers that must go to the desired target i.e {"Content-Type": "application/json"}
- body?: String, A json string that will include the body which will go to the desired target i.e '{"message":"Heyo there"}' (must be string)

Headers are optional, and will not be sent if not specified.
Body is optional unless using a request such as POST or PUT in which case they are relatively required however if not provided an empty string will go to the desired target.
The rest of the items from the above list are required.

Once the request has been sent you will receive the following object:
```
{ 
    status: Int, 
    message: String, 
    ret: Object 
}
```
Status: 0, There are no errors and the desired target's return will be inside "ret"
Status: 1, There are errors either from the desired target or primary server in which case the message for the error will be inside "message"

## Section 2, Setting your own Cors Destoryer:
1. The app uses NodeJS with the following packages:
- Express (express) [npm install express]
- Body Parser (body-parser) [npm install body-parser]
- Cors (cors) [npm install cors]
- Request (request) [npm install request]

2. Once the packages are installed you must verify that the port provided match your host, generally hosts allow you to do process.env.PORT however you must verify the port with your hosting service, and change the port to the requested port (look for const port = ... should be on line 2)
3. Once the port has been changed you must simply run the script, you may use any node service or simply do `node index.js`
4. And that's it, you must figure out your URL and use every knowledge gained from Section 1. replacing Endpoint with your own URL.
