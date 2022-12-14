terraform {
  backend "s3" {
    # Replace this with your bucket name!
    bucket = "aha-exam-tf-backend"
    key    = "terraform.tfstate"
    region = "ap-southeast-1"
    # Replace this with your DynamoDB table name!
    dynamodb_table = "aha-exam-tf-backend-locks"
    encrypt        = true
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }
  required_version = ">= 0.14.9"
}
