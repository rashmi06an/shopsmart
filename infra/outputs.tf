# ── S3 ─────────────────────────────────────────────────────────────────────────
output "bucket_name" {
  description = "Name of the S3 bucket created by Terraform"
  value       = aws_s3_bucket.this.bucket
}

# ── ECR ────────────────────────────────────────────────────────────────────────
output "frontend_ecr_repository_url" {
  description = "ECR repository URL for frontend images"
  value       = aws_ecr_repository.frontend.repository_url
}

output "backend_ecr_repository_url" {
  description = "ECR repository URL for backend images"
  value       = aws_ecr_repository.backend.repository_url
}

# ── ECS ────────────────────────────────────────────────────────────────────────
output "ecs_cluster_name" {
  description = "ECS cluster name"
  value       = aws_ecs_cluster.main.name
}

output "frontend_ecs_service_name" {
  description = "Frontend ECS service name"
  value       = aws_ecs_service.frontend.name
}

output "backend_ecs_service_name" {
  description = "Backend ECS service name"
  value       = aws_ecs_service.backend.name
}

output "frontend_ecs_task_family" {
  description = "Frontend ECS task definition family name"
  value       = aws_ecs_task_definition.frontend.family
}

output "backend_ecs_task_family" {
  description = "Backend ECS task definition family name"
  value       = aws_ecs_task_definition.backend.family
}

# ── VPC ────────────────────────────────────────────────────────────────────────
output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}
output "alb_url" {
  value = aws_lb.main.dns_name
}
