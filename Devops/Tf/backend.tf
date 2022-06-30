resource "linode_instance" "back_end" {
  image           = "linode/ubuntu20.04"
  label           = "node-2"
  group           = "Website"
  region          = "ap-west"
  type            = "g6-nanode-1"
  authorized_keys = [var.auth_key]
  root_pass       = var.user_pwd
  tags            = ["flask"]
  stackscript_id  = 1020123
  stackscript_data = {
    "db_url"          = var.db_url
    "db_username"     = var.db_username
    "db_password"     = var.db_password
    "db_name"         = var.db_name
    "collection_name" = var.collection_name
  }
}
