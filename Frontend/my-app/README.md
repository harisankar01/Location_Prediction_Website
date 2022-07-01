# React Frontend

The front-end is a single-page website made with the **React** framework and **Typescript**. _Create React App_ is used as an environment for the react framework.

## Local development

Clone the repository,

```
git clone https://github.com/harisankar01/Location_Prediction_Website.git
cd Frontend/my-app/
```

Install all the packages using npm,

```
npm install
```

Start the development server,

```
npm start
```

Go to `http://localhost:3000` to get to the website.

## Styling Libraries used

The following packages are used to develop the `CSS` of the website,

- Styled-Components
- React-icons
- Material UI

Normal CSS is also used in some parts of the website.

## Backend Connectivity

### Development

The **proxy** configuration is used to direct the connection from the frontend to the backend. The proxy settings can be found in the `package.json` file. For local development change the proxy server to `http://localhost:port` and the port represent the port in which the backend server is running.

### Docker

On using docker containers to deploy the app, the endpoints of the backend must be added to the `nginx.conf` files to prevent _CORS_.

> The endpoints for this project are already added to the `nginx.conf` file.

TO deploy the app using the given docker configurations run the following commands,

```
docker-compose build
```

```
docker-compose up
```

> Please refer to the Deployment folder to know how deployment is made using terraform.
