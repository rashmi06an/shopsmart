resource "aws_security_group" "ecs_tasks" {
  name        = "shopsmart-ecs-sg"
  description = "Allow inbound traffic from ALB to ECS tasks"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "Frontend from ALB"
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  ingress {
    description     = "Backend from ALB"
    from_port       = 5000
    to_port         = 5000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
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

resource "aws_cloudwatch_log_group" "frontend" {
  name              = "/ecs/shopsmart-frontend"
  retention_in_days = 7

  tags = { Name = "shopsmart-frontend-logs", ManagedBy = "terraform" }
}

resource "aws_cloudwatch_log_group" "backend" {
  name              = "/ecs/shopsmart-backend"
  retention_in_days = 7

  tags = { Name = "shopsmart-backend-logs", ManagedBy = "terraform" }
}

resource "aws_ecs_cluster" "main" {
  name = "shopsmart-cluster"

  tags = { Name = "shopsmart-cluster", Environment = var.environment, ManagedBy = "terraform" }
}

resource "aws_ecs_task_definition" "frontend" {
  family                   = "shopsmart-frontend"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = data.aws_iam_role.lab_role.arn
  task_role_arn            = data.aws_iam_role.lab_role.arn

  container_definitions = jsonencode([{
    name      = "shopsmart-frontend"
    image     = var.frontend_container_image
    essential = true

    portMappings = [{
      containerPort = 80
      protocol      = "tcp"
    }]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.frontend.name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "ecs"
      }
    }

    healthCheck = {
      command     = ["CMD-SHELL", "wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1"]
      interval    = 30
      timeout     = 5
      retries     = 3
      startPeriod = 20
    }
  }])

  tags = { Name = "shopsmart-frontend-task-def", ManagedBy = "terraform" }
}

resource "aws_ecs_task_definition" "backend" {
  family                   = "shopsmart-backend"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = data.aws_iam_role.lab_role.arn
  task_role_arn            = data.aws_iam_role.lab_role.arn

  container_definitions = jsonencode([{
    name      = "shopsmart-backend"
    image     = var.backend_container_image
    essential = true

    portMappings = [{
      containerPort = 5000
      protocol      = "tcp"
    }]

    environment = [
      { name = "NODE_ENV", value = "production" },
      { name = "PORT", value = "5000" },
      { name = "ALLOWED_ORIGINS", value = "" }
    ]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.backend.name
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

  tags = { Name = "shopsmart-backend-task-def", ManagedBy = "terraform" }
}

resource "aws_ecs_service" "frontend" {
  name            = "shopsmart-frontend"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.frontend.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.public_a.id, aws_subnet.public_b.id]
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.frontend.arn
    container_name   = "shopsmart-frontend"
    container_port   = 80
  }

  lifecycle {
    ignore_changes = [task_definition]
  }

  tags = {
    Name        = "shopsmart-frontend-service"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

resource "aws_ecs_service" "backend" {
  name            = "shopsmart-backend"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.public_a.id, aws_subnet.public_b.id]
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.backend.arn
    container_name   = "shopsmart-backend"
    container_port   = 5000
  }

  lifecycle {
    ignore_changes = [task_definition]
  }

  tags = {
    Name        = "shopsmart-backend-service"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}
