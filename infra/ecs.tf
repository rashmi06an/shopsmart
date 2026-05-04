# ── Security Group ─────────────────────────────────────────────────────────────
resource "aws_security_group" "ecs_tasks" {
  name        = "shopsmart-ecs-sg"
  description = "Allow inbound traffic to ECS tasks on port 5000"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "App port"
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow all outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "shopsmart-ecs-sg", Environment = var.environment }
}

# ── CloudWatch Log Group ───────────────────────────────────────────────────────
resource "aws_cloudwatch_log_group" "shopsmart" {
  name              = "/ecs/shopsmart"
  retention_in_days = 7

  tags = { Name = "shopsmart-logs", ManagedBy = "terraform" }
}

# ── ECS Cluster ────────────────────────────────────────────────────────────────
resource "aws_ecs_cluster" "main" {
  name = "shopsmart-cluster"

  tags = { Name = "shopsmart-cluster", Environment = var.environment, ManagedBy = "terraform" }
}

# ── ECS Task Definition ────────────────────────────────────────────────────────
resource "aws_ecs_task_definition" "shopsmart" {
  family                   = "shopsmart-api"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = data.aws_iam_role.lab_role.arn
  task_role_arn            = data.aws_iam_role.lab_role.arn

  container_definitions = jsonencode([{
    name      = "shopsmart-api"
    image     = var.container_image
    essential = true

    portMappings = [{
      containerPort = 5000
      protocol      = "tcp"
    }]

    environment = [
      { name = "NODE_ENV", value = "production" },
      { name = "PORT",     value = "5000" }
    ]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.shopsmart.name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "ecs"
      }
    }

    healthCheck = {
      command     = ["CMD-SHELL", "node -e \"require('http').get('http://127.0.0.1:5000/api/health', r => process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))\""]
      interval    = 30
      timeout     = 5
      retries     = 3
      startPeriod = 20
    }
  }])

  tags = { Name = "shopsmart-task-def", ManagedBy = "terraform" }
}

# ── ECS Service (Fargate) ──────────────────────────────────────────────────────
resource "aws_ecs_service" "shopsmart" {
  name            = "shopsmart-api"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.shopsmart.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.public_a.id, aws_subnet.public_b.id]
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = true
  }

  # CI deploy action manages task definition updates; Terraform owns the service shape.
  lifecycle {
    ignore_changes = [task_definition]
  }


  tags = { Name = "shopsmart-service", Environment = var.environment, ManagedBy = "terraform" }
}
