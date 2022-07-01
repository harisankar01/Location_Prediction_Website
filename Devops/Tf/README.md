# Deployment

Terraform is used to deploy resources in the cloud directly using code. The `main.tf` file represents the blueprint of the cloud environment. Perform the following steps to deploy the website in **Linode**,

- Create a Linode account and get a personal access token. You can follow this [guide](https://www.linode.com/docs/products/tools/linode-api/guides/get-access-token/).
- Then create an auth-key and password.
  We can use `ssh-keygen` to generate an auth-key.
  We can use the following python command to generate a secure password,

```
python -c import secrets;print(secrets.token_urlsafe(32))
```

- Create a file named `terraform.tfvars` and copy the `sample-tfvars`. Then substitute the original values in the `terraform.tfvars` file.
- Then run the following commands,
  Download dependencies for Linode

```
terraform init
```

Check if the terraform file is correct

```
terraform plan
```

To deploy the environments and application

```
terraform apply
```

- After performing these steps, we can see a file called `terraform.tfstat` which represents the state of the cloud environment and has all output values. You can see `DB_outputs` with three values inside it.
  The first value is the URL and it must be prefixed to `mongodb://`, therefor the real URL will be `mmongodb:/url`
  The second value is the username and the third is the password.

We can use these values to connect to the MongoDB cluster using a **MongoDB compass** and create a collection to work with. Follow this [guide](https://www.linode.com/docs/products/databases/managed-databases/guides/mongodb-connect/) to do this.

- Then substitute all the values for the database in the `terraform.tfvars` file.
- Copy the `backend.tf` file to the end of the main.tf` file and run the following commands,

(optional)

```
terraform plan
```

Apply the new changes to the cloud environment using the following command,

```
terraform apply
```

- In the `terraform.tfstate` file, you can see `instance_outputs` which gives the IP address of frontend-node

Open the browser and type `http://ip:8080` to go to the website.👍

#### Role of StackScripts

StackScripts contain a series of shell commands that runs in the Linode just after the Linode is deployed. Two StackScripts, separately for front and backends are being used in the project.
These stack scripts perform the following actions,

- Install git, docker, and docker-compose
- Set environment variables taken from the `.env` file in Linode
- Clone the GitHub repository.
- Run `docker-compose build` to create the docker containers
- Run `docker-compose up` to run the docker containers.

> The stack scripts can be found in the `Devops/stackscript` folder or Linode in the following links,
>
> > [Frontend](https://cloud.linode.com/stackscripts/1020122) [Backend](https://cloud.linode.com/stackscripts/1020123)

## Role of docker

Docker containers are used for deployment in this project. **Nginx** web servers are used in both the front and back end to make the website accessible through the internet. You can find the `nginx.conf` files in both the front-end and backend folders. The version of Nginx images are,

- Backend - `nginx:1.15.8`
- Frontend - Default

The `nginx.conf` files for the frontend have been configured to avoid _CORS_ to backend endpoints. If new endpoints are added to the backend, then `nginx.conf` file in frontend must be configured again for the new endpoints.
