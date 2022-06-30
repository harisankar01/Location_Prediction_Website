output "frontend_outputs" {
  value = "${linode_instance.front_end.label} : ${linode_instance.front_end.ip_address}"
}
output "backend_outputs" {
  value = "${linode_instance.back_end.label} : ${linode_instance.back_end.ip_address}"
}
output "DB_outputs" {
  value     = " ${linode_database_mongodb.Database.host_primary}: ${linode_database_mongodb.Database.root_username} : ${linode_database_mongodb.Database.root_password}"
  sensitive = true
}
