output "instance_outputs" {
  value = "${linode_instance.front_back_ends.0.label} : ${linode_instance.front_back_ends.0.ip_address}"
}
output "DB_outputs" {
  value     = " ${linode_database_mongodb.Database.host_primary}: ${linode_database_mongodb.Database.root_username} : ${linode_database_mongodb.Database.root_password}"
  sensitive = true
}
