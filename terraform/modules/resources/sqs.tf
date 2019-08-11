locals {
  transactionsQueueName = "transactions-${var.environment}"
}

resource "aws_sqs_queue" "transactions" {
  name                       = "${local.transactionsQueueName}"
  visibility_timeout_seconds = 30
  message_retention_seconds  = 86400
}