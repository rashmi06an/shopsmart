variable "aws_region" {
  description = "AWS region to deploy all resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Deployment environment label (dev / staging / prod)"
  type        = string
  default     = "dev"
}

variable "container_image" {
  description = "Initial container image for the ECS task definition. Overridden by the CI deploy step after the first ECR push."
  type        = string
  default     = "node:20-alpine"
}
variable "alb_port" {
  default = 80
}