module "email-cdc-user-created" {
  source     = "./modules/sqs"
  q_name     = "${terraform.workspace}-email-cdc-user-created"
  create_dlq = var.create_dlq
  topic_arn  = aws_sns_topic.cdc-user-created.arn
  fifo_queue = false
}

module "user-authenticated-queue" {
  source     = "./modules/sqs-without-sns"
  q_name     = "${terraform.workspace}-user-authenticated"
  create_dlq = var.create_dlq
  fifo_queue = false
}

module "user-cdc-user-action-created" {
  source     = "./modules/sqs"
  q_name     = "${terraform.workspace}-user-cdc-user-action-created"
  create_dlq = var.create_dlq
  topic_arn  = aws_sns_topic.cdc-user-action-created.arn
  fifo_queue = false
}
