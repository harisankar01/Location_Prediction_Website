# Backend

The backend is made with **Flask**, a lightweight web application framework. The important functions of the backend are as follows,

- Predict the location in the image using Machine learning.
- Connect to MongoDB database on Linode Cloud

## Endpoints

- `/`: A `GET` request endpoint for checking if the backend is up and running. Return "The Home page" on the `GET` request
- `/predict`: A `POST` request endpoint with the image as the body. Perform prediction using machine learning
- `/db`: A `POST` request endpoint that has the indexes with high probabilities as body and fetches the names of locations from MongoDB

## Local Development

- Put all the environment varibles in the `.env` file. Ues the structure present in the `sample.env` file to create the `.env` file.
- Clone the repository

```
git clone https://github.com/harisankar01/Location_Prediction_Website.git
cd Location_Prediction_Website/Backend
```

- Run the local server

```
python app.py
```

## Machine learning

The machine learning model is taken from the _Tensorflow Hub_ takes an image as input and predicts the landmark or location in the image. The machine learning model can predict a total of 98949 places in ASIA.

### Outputs of ML model

The machine learning model returns an **array of 98949 probability values** which has the _probability_ that the image is the image of the expected landmark or location. The value in the array with the highest probability is our desired result. The index of the array is used as an alias to the `id` of the name of the locations present in the database.

## Database

A **MongoDB** database is used to store the `name` and `id` of 98949 locations which can be predicted by the machine learning model.

The database has a total of 98949 documents. Each document has the following structure,

The index of high probability values obtained from the model is queried with the `id` in the database to find the name of the location. The **pymongo** package is used to connect and access the database.

> The file that should be uploaded to the database are present in the `Machine learning files` folder.

## Running Docker containers

You can also `ssh` into the Linode machine and put your environment variables into the `.env` file. Then run the following commands to run the docker container,
Build a docker container:

```
docker-compose build
```

Run a docker container

```
docker-compose --env-file ./env up
```

You can specify the values directly in the terraform file for the stack scripts to deploy the docker containers.

> Please refer to the deployments folder for complete instructions on how to deploy the application with **Terraform**
