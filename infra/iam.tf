# ── ECS Task Execution Role (pulls image, writes logs) ─────────────────────────
resource "aws_iam_role" "ecs_task_execution" {
  name = "shopsmart-ecs-task-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })

  tags = { Name = "shopsmart-task-execution-role", ManagedBy = "terraform" }
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution" {
  role       = aws_iam_role.ecs_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# ── ECS Task Role (permissions the container itself has at runtime) ─────────────
resource "aws_iam_role" "ecs_task" {
  name = "shopsmart-ecs-task-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })

  tags = { Name = "shopsmart-task-role", ManagedBy = "terraform" }
}
