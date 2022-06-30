terraform {
  required_version = ">= 0.15"
  required_providers {
    linode = {
      source  = "linode/linode"
      version = "1.28.0"
    }
  }
}
provider "linode" {
  token = var.linode_personal_token
}

resource "linode_instance" "front_ends" {
  count           = "1"
  image           = "linode/ubuntu20.04"
  label           = "node-1"
  group           = "Website"
  region          = "ap-west"
  type            = "g6-nanode-1"
  authorized_keys = [var.auth_key]
  root_pass       = var.user_pwd
  tags            = ["react"]
  stackscript_id  = 1020122
}
resource "linode_instance" "back_end" {
  count           = "1"
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
resource "linode_database_mongodb" "Database" {
  label        = "backend_db"
  engine_id    = "mongodb/4.4.10"
  region       = "ap-west"
  type         = "g6-nanode-1"
  allow_list   = ["${linode_instance.front_end.ip_address}", "${linode_instance.back_end.ip_address}", "0.0.0.0/0"]
  cluster_size = 1
}
resource "linode_firewall" "backend_firewall" {
  label = "Flask_backend_firewall"
  inbound {
    label    = "allow-frontend"
    action   = "ACCEPT"
    protocol = "TCP"
    ports    = "80,443"
    ipv4     = ["${linode_instance.front_end.ip_address}", var.my_ip]
  }

  inbound_policy = "ACCEPT"

  outbound {
    label    = "allow-front_db_ends"
    action   = "ACCEPT"
    protocol = "TCP"
    ports    = "80,443"
    ipv4     = ["0.0.0.0/0"]
    ipv6     = ["::/0"]
  }

  outbound_policy = "ACCEPT"

  linodes = ["${linode_instance.back_end.id}"]
}
