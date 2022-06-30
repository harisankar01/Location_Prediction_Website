#!/bin/bash
# Get environment variables from user
# <UDF name="db_url" Label="Mongodb host url" />
# <UDF name="db_username" Label="username provided by linode" />
# <UDF name="db_password" Label="password provided by linode" />
# <UDF name="db_name" Label="MongoDB database name" />
# <UDF name="collection_name" Label="collection name in the specified database" />
# Save environment variables to system
export DB_URL="$db_url"
export DB_USERNAME="$db_username"
export DB_PASSWORD="$db_password"
export DB_NAME="$db_name"
export DB_COLLECTION_NAME="$collection_name"
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
apt-get update
apt-get upgrade -y
apt-get dist-upgrade -y
apt-get install docker-compose -y
#Install Git
apt-get install git -y
#Clone the repo
git clone https://github.com/harisankar01/Location_Prediction_Website.git
cd Location_Prediction_Website/Backend
docker-compose build
docker-compose up
