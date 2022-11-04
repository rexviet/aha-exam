module "email-cdc-user-created" {
  source     = "./modules/sqs"
  q_name     = "${terraform.workspace}-email-cdc-user-created"
  create_dlq = var.create_dlq
  topic_arn  = aws_sns_topic.cdc-user-created.arn
  fifo_queue = false
}
