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

resource "linode_instance" "front_back_ends" {
  count           = "2"
  image           = "linode/ubuntu20.04"
  label           = "node-${count.index + 1}"
  group           = "Website"
  region          = "ap-west"
  type            = "g6-nanode-1"
  authorized_keys = [var.auth_key]
  root_pass       = var.user_pwd
  tags            = ["react", "sass", "flask"]
}

resource "linode_database_mongodb" "Database" {
  label        = "backend_db"
  engine_id    = "mongodb/4.4.10"
  region       = "ap-west"
  type         = "g6-nanode-1"
  allow_list   = ["${linode_instance.front_back_ends.1.ip_address}", "${linode_instance.front_back_ends.0.ip_address}", var.my_ip]
  cluster_size = 1
}
resource "linode_firewall" "backend_firewall" {
  label = "Flask_backend_firewall"
  inbound {
    label    = "allow-frontend"
    action   = "ACCEPT"
    protocol = "TCP"
    ports    = "80,443"
    ipv4     = ["${linode_instance.front_back_ends.0.ip_address}", var.my_ip]
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

  linodes = ["${linode_instance.front_back_ends.1.id}"]
}
