<div align="center">
  <h1>ShopSmart Infrastructure & Automated CI/CD</h1>
  <p><b>A highly available, serverless e-commerce backend deployed on AWS ECS Fargate via Terraform and modular GitHub Actions.</b></p>

  [![Terraform](https://img.shields.io/badge/Terraform-1.7.5-623CE4.svg?logo=terraform)](https://www.terraform.io/)
  [![AWS](https://img.shields.io/badge/AWS-ECS_Fargate-FF9900.svg?logo=amazonaws)](https://aws.amazon.com/)
  [![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF.svg?logo=github-actions)](https://github.com/features/actions)
  [![Docker](https://img.shields.io/badge/Docker-Multi--Stage-2496ED.svg?logo=docker)](https://www.docker.com/)
</div>

<br/>

## Architecture Overview
ShopSmart utilizes a robust AWS networking and container orchestration topology.

```text
       [ GitHub Actions (CI/CD) ]
                  | (Terraform Apply / Docker Push)
                  v
+----------------------------------------------------+
|                   AWS CLOUD                        |
|                                                    |
|  [ S3 Bucket (TF State) ]    [ ECR (Docker Reg) ]  |
|                                                    |
|  +----------------------------------------------+  |
|  |                  VPC (us-east-1)             |  |
|  |  +----------------------------------------+  |  |
|  |  | IGW (Internet Gateway)                 |  |  |
|  |  +----------------------------------------+  |  |
|  |                                              |  |
|  |  +------------------+  +------------------+  |  |
|  |  | Public Subnet A  |  | Public Subnet B  |  |  |
|  |  |                  |  |                  |  |  |
|  |  | [ ECS Task ]     |  | [ ECS Task ]     |  |  |
|  |  | (Fargate Node.js)|  | (Fargate Node.js)|  |  |
|  |  +------------------+  +------------------+  |  |
|  |                                              |  |
|  |  [ Security Group: Allow TCP 5000 ]          |  |
|  +----------------------------------------------+  |
|                                                    |
|  [ CloudWatch Logs (/ecs/shopsmart-api-logs) ]     |
+----------------------------------------------------+
```

## Tech Stack

| Category | Technology |
|---|---|
| **Infrastructure as Code** | HashiCorp Terraform (`v1.7.x`) |
| **Cloud Provider** | Amazon Web Services (AWS) |
| **Compute** | ECS Fargate (Serverless Containers) |
| **Networking** | Custom VPC, Public Subnets, Security Groups |
| **CI/CD** | GitHub Actions (Reusable modular workflows) |
| **Containerization** | Docker (Multi-stage, non-root users) |
| **Application** | Node.js, Vitest, Jest |

## Project Structure
```text
.
├── .github/workflows/          # Modular CI/CD Orchestration
│   ├── ci-cd.yml               # Master Orchestrator
│   ├── phase1-test.yml         # Unit & Integration Testing
│   ├── phase2-terraform.yml    # IaC Provisioning
│   ├── phase3a-build-push.yml  # Docker Build & ECR Publish
│   └── phase3b-deploy.yml      # ECS Fargate Rollout
├── infra/                      # Terraform Codebase
│   ├── main.tf                 # Global resources (S3, random_id)
│   ├── vpc.tf                  # Networking backbone
│   ├── ecs.tf                  # Cluster, Service, Task Def, CloudWatch
│   ├── ecr.tf                  # Container Registry & Lifecycle policies
│   ├── iam.tf                  # LabRole data lookups
│   ├── providers.tf            # AWS Provider & S3 Backend config
│   └── variables.tf            # Environment parameters
├── server/                     # Node.js API Service
│   └── Dockerfile              # Multi-stage optimized Dockerfile
└── scripts/
```

## Remote State & Backend
Terraform state is strictly managed remotely via an **AWS S3 Backend**. 
- **Security:** State files are encrypted at rest (`AES-256`) and never committed to version control.
- **Collaboration:** Prevents state divergence and race conditions in team environments.
- **Resilience:** Bucket versioning allows point-in-time recovery of infrastructure state.

## Core DevOps Concepts Demonstrated

| Concept | Implementation in ShopSmart |
|---|---|
| **Idempotency** | Terraform ensures applying the same configuration multiple times results in the exact same infrastructure state. |
| **Modularity** | The GitHub Actions pipeline is broken into single-responsibility, reusable workflows. |
| **Immutability** | Docker containers ensure the app behaves exactly the same in CI/CD as it does in AWS. |
| **Least Privilege** | Security groups restrict traffic to port 5000. Containers run as a non-root `appuser`. |

## Getting Started 

### Prerequisites
- AWS CLI installed and configured
- Terraform `v1.7+` installed
- Docker installed (optional for local testing)

### 1. Setup AWS Credentials
Export your temporary credentials (or configure AWS IAM user profiles):
```bash
export AWS_ACCESS_KEY_ID="ASIA..."
export AWS_SECRET_ACCESS_KEY="..."
export AWS_SESSION_TOKEN="..."
```

### 2. Terraform Workflow
Navigate to the infrastructure directory and provision:
```bash
cd infra/
terraform init    # Initializes the S3 backend and downloads providers
terraform plan    # Previews infrastructure changes
terraform apply   # Provisions VPC, ECR, ECS, and networking in AWS
```

## Command Reference

| Command | Description |
|---|---|
| `terraform validate` | Lints and validates HCL syntax |
| `terraform output` | Displays key outputs (ECR URL, VPC ID, etc) |

## CI/CD Pipeline
ShopSmart uses a highly modular GitHub Actions pipeline triggered on merges to `main`:

| Phase | Action | Purpose |
|---|---|---|
| **1. Test** | `vitest`, `jest` | Executes unit and integration tests. Generates and uploads test reports. Blocks pipeline on failure. |
| **2. Terraform Apply** | `terraform apply` | Authenticates via GitHub Secrets. Provisions all AWS infrastructure automatically. |
| **3a. Docker Build & Push** | `docker build`, `docker push` | Authenticates to ECR, builds the multi-stage Dockerfile, tags with Git SHA, and pushes to AWS. |
| **3b. Deploy to ECS** | AWS CLI, ECS Actions | Downloads task definition, injects new image URI, deploys to Fargate, and awaits service stability (`runningCount >= 1`). |

## Outputs / What Gets Created
Upon successful apply, Terraform outputs the following parameters:

| Output Name | Description |
|---|---|
| `bucket_name` | Secure S3 bucket for internal assets |
| `ecr_repository_url` | Registry URI for Docker images |
| `ecs_cluster_name` | Fargate cluster identifier |
| `vpc_id` | The ID of the isolated network layer |

## Common Errors & Fixes

| Error | Common Cause | Resolution |
|---|---|---|
| `ExpiredToken` | Temporary AWS Learner Lab credentials have expired. | Refresh credentials in the AWS portal and update local terminal/GitHub Secrets. |
| `Missing region value` | Initializing Terraform locally without required variables. | Ensure backend configs are provided, or `providers.tf` has hardcoded defaults. |


## Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
