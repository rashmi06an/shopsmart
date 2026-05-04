terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }

  # Partial backend config — bucket & region are injected by CI via
  # -backend-config flags so no secrets are hardcoded in source.
  backend "s3" {
    key     = "shopsmart/terraform.tfstate"
    encrypt = true
  }
}

provider "aws" {
  region = var.aws_region
}
