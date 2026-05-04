# In AWS Academy, we are not allowed to create new IAM roles. 
# We must use the pre-existing "LabRole".

data "aws_iam_role" "lab_role" {
  name = "LabRole"
}
