# ── S3 ─────────────────────────────────────────────────────────────────────────
output "bucket_name" {
  description = "Name of the S3 bucket created by Terraform"
  value       = aws_s3_bucket.this.bucket
}

# ── ECR ────────────────────────────────────────────────────────────────────────
output "ecr_repository_url" {
  description = "ECR repository URL used by CI to push Docker images"
  value       = aws_ecr_repository.shopsmart.repository_url
}

# ── ECS ────────────────────────────────────────────────────────────────────────
output "ecs_cluster_name" {
  description = "ECS cluster name"
  value       = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  description = "ECS service name"
  value       = aws_ecs_service.shopsmart.name
}

output "ecs_task_family" {
  description = "ECS task definition family name"
  value       = aws_ecs_task_definition.shopsmart.family
}

# ── VPC ────────────────────────────────────────────────────────────────────────
output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}
output "alb_url" {
  value = aws_lb.main.dns_name
}