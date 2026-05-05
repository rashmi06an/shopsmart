#!/bin/bash

# ==============================================================================
# AWS Resource Cleanup Script for ShopSmart
# Use this script to forcefully delete the resources that cause "Already Exists" 
# conflicts if your local Terraform state gets out of sync with GitHub Actions.
# ==============================================================================

REGION="us-east-1"
CLUSTER_NAME="shopsmart-cluster"
SERVICE_NAME="shopsmart-api"
ECR_REPO="shopsmart"
LOG_GROUP="/ecs/shopsmart"

echo "🧹 Starting AWS Cleanup..."

# ------------------------------------------------------------------------------
# 1. ECS (Elastic Container Service)
# ------------------------------------------------------------------------------
echo "⏳ Deleting ECS Service and Cluster..."
# Scale down to 0 tasks first so it can be safely deleted
aws ecs update-service \
    --cluster $CLUSTER_NAME \
    --service $SERVICE_NAME \
    --desired-count 0 \
    --region $REGION \
    > /dev/null 2>&1 || true

# Force delete the service
aws ecs delete-service \
    --cluster $CLUSTER_NAME \
    --service $SERVICE_NAME \
    --force \
    --region $REGION \
    > /dev/null 2>&1 || true

# Delete the cluster
aws ecs delete-cluster \
    --cluster $CLUSTER_NAME \
    --region $REGION \
    > /dev/null 2>&1 || true

echo "✅ ECS cleaned."

# ------------------------------------------------------------------------------
# 2. ECR (Elastic Container Registry)
# ------------------------------------------------------------------------------
echo "⏳ Deleting ECR Repository..."
# --force will automatically delete all Docker images inside the repo first
aws ecr delete-repository \
    --repository-name $ECR_REPO \
    --force \
    --region $REGION \
    > /dev/null 2>&1 || true

echo "✅ ECR cleaned."

# ------------------------------------------------------------------------------
# 3. CloudWatch Logs
# ------------------------------------------------------------------------------
echo "⏳ Deleting CloudWatch Log Group..."
aws logs delete-log-group \
    --log-group-name $LOG_GROUP \
    --region $REGION \
    > /dev/null 2>&1 || true

echo "✅ Logs cleaned."

# ------------------------------------------------------------------------------
# 4. Local Terraform State Cleanup
# ------------------------------------------------------------------------------
echo "⏳ Removing corrupted local Terraform state files..."
rm -rf infra/.terraform
rm -f infra/terraform.tfstate*
rm -f infra/tfplan
echo "✅ Local state cleaned."

echo ""
echo "🎉 Cleanup complete! You can now safely push to GitHub or run Terraform again."
echo "⚠️ Note: The VPC and S3 buckets were left intact. They rarely cause naming conflicts and deleting a VPC via bash is unsafe. If you must delete the VPC, run 'terraform destroy' instead."
