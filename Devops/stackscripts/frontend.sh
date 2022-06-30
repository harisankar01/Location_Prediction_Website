#!/bin/bash
# Install Docker and docker-compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
apt-get update && apt-get upgrade -y
apt-get install docker-compose -y
#Install Git
apt-get install git -y
#Clone the repo
git clone https://github.com/harisankar01/Location_Prediction_Website.git
# Start the containers
cd Location_Prediction_Website/Frontend/my-app
docker-compose build
docker-compose up