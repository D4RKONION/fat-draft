# FAT Draft
FAT Draft is a way for users to draft characters in Fighting Games. Users take turns banning and selecting characters until they're finished. You can try the live version @ [fullmeter.com/fatdraft](https://fullmeter.com/fatdraft/#/Home)
  
## Contributing to FAT Draft

### Developing
If you'd like to contribute to FAT Draft, please open an issue about what you're interested in doing. I won't accept a pull request without an issue, so don't waste your time. You can also discuss it with me in our [discord channel](https://discord.gg/BfrCaHKU5J)

## Reusing FAT Draft source code
For more details, you can read the license but essentially anything you make with FAT Draft's source code
- must be open source as well
- must link to this repository in your own repository
- must visibly credit FAT Draft in the final product 

## Developing for FAT Draft
FAT Draft uses React for the frontend and Socket.io to communicate with an Express server in the backend. Install npm and then 

### Setup
```
npm install
```

### Run
To run the project in your browser do
```
npm run start
```
To run the backend server, in a separate terminal do
```
cd server
node ./app.js
```

## Deployment
First you'll need change the URLs to production as follows 

```
./src/js/socket/index.tsx
const ENDPOINT = "https://yourdomain.com";
const PATH = "/backendsubdomain"
```

and

```
./server/app.js
const io = socketIo(server, {
  path: "/backendsubdomain",
  cors: {
    origin: "https://yourdomain.com/frontendsubdomain",
  },
});
```

Change your package.json to have the appropriate homepage for your frontend
```
  "homepage": "/frontendsubdomain",
``` 
and do 
```
npm run build
```

Finally, here's how I'm routing the data to my backend with NGINX
```
location /backendsubdomain/ {
  proxy_pass http://localhost:PORTNUMBERHERE]; 
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}
```