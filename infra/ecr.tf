# ── ECR Repository ─────────────────────────────────────────────────────────────
resource "aws_ecr_repository" "shopsmart" {
  name                 = "shopsmart"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "shopsmart-ecr"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

# ── Lifecycle Policy: keep only last 5 images ──────────────────────────────────
resource "aws_ecr_lifecycle_policy" "shopsmart" {
  repository = aws_ecr_repository.shopsmart.name

  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last 5 images; expire older ones"
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = 5
      }
      action = { type = "expire" }
    }]
  })
}
