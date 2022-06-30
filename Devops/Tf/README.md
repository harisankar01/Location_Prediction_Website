# Deployment

Terraform is used to deploy resources in cloud directly using code. The `main.tf` file represent the blueprint of the cloud environement. Perfom the following steps to deploy the website in **Linode**,

- Create a linode account and get a personal access token. You can follow this [guide](https://www.linode.com/docs/products/tools/linode-api/guides/get-access-token/).
- Then create a auth-key and password.
  We can use `ssh-keygen` to genrate a auth-key.
  We can use the following python command to generate a secure password,

```
python -c import secrets;print(secrets.token_urlsafe(32))
```

- Create a file named `terraform.tfvars` and copy the `sample-tfvars`. Then substiute the correct values generated.
- Then run the following commands,
  Download dependencies for linode

```
terraform init
```

Check if the terraform file is correct

```
terraform plan
```

The deploy the environments and application

```
terraform apply
```

- After perfoming these steps, we can see a file called `terraform.tfstat` which represent the state of cloud environment and has all output values. You can see `DB_outputs` with three values inside it.
  The first value is the url and it must be prefixed to `mongodb://`, therefor the real url will be `mmongodb:/url`
  The second value is the username and the third is the password.

We can use these values to login to mongodb cluster using a **mongodb compass** and create a colloection to work with. Follow this [guide](https://www.linode.com/docs/products/databases/managed-databases/guides/mongodb-connect/) to do this.

- Then substitute all the values in the `terraform.tfvars` file.
- Copy the `backend.tf` file to the end of `main.tf` file and run the following commands,
  (optional)

```
terraform plan
```

Apply the new changes to cloud environment

```
terraform apply
```

- In the `terraform.tfstate` file, you can see `instance_outputs` which gives the ip address of frontend-node

Open the browser and type `http://ip:8080` to go to the website.
