// Your chosen port 
const port = 3000;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

const cors = require('cors');

app.use(bodyParser.text());

app.get('/', (req, res) => {
  res.send("Hello, you are not using this correctly if you are here.");
})

app.post('/req', cors({origin: '*'}), async (req, res) => {
  
  let response = {'status': 0, 'message': '', 'ret': {}};
  
  try {
    const request = JSON.parse(req.body);    
    response = await handleRequest(request);
  } catch(err) {
    response.status = 1;
    response.message = "Your body must be JSON using Content-Type: 'text/plain'";
  }

  res.send(JSON.stringify(response));
})

async function handleRequest(params) {
  if (!('method' in params)) return {status: 1, message: 'You did not specify a method'};
  if (!('url' in params)) return {status: 1, message: 'You did not specify a url'};

  let body = '';
  if ('body' in params) body = params.body;

  let headers = null;
  if ('headers' in params) headers = params.headers;

  try {
    let resp = await makeRequest(params.url, params.method, body, headers);
    return {status: 0, message: '', ret: resp};
  } catch(err) {
    return {status: 1, message: err};
  }
}

function makeRequest(url, method, body, headers) {
  return new Promise((resolve, reject) => {
    if (typeof(body) != 'string') return reject('Body must be string');
    if (typeof(headers) != 'object') return reject('Headers must be an object with Key:Value');
    let obj = {
        method: method,
      }

    if (headers != null) obj.headers = headers;
    if (body != null) obj.body = body;
    try {
      request(url, obj, (err, res, body) => {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      })

    } catch(err) {
      reject(err);
    }
  })
}

app.listen(port, () => {
  console.log(`Started on port: ${port}`)
})
