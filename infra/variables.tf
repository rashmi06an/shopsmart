variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "environment" {
  type    = string
  default = "dev"
}

variable "frontend_container_image" {
  type    = string
  default = "nginx:stable-alpine"
}

variable "backend_container_image" {
  type    = string
  default = "node:20-alpine"
}