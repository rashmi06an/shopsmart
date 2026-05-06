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

variable "frontend_container_image" {
  description = "Initial frontend container image for ECS task definition. Overridden by CI/CD after first ECR push."
  type        = string
  default     = "nginx:stable-alpine"
}

variable "backend_container_image" {
  description = "Initial backend container image for ECS task definition. Overridden by CI/CD after first ECR push."
  type        = string
  default     = "node:20-alpine"
}
