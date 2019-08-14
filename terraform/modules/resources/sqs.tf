locals {
  transactionsQueueName = "transactions-${var.environment}"
}

resource "aws_sqs_queue" "transactions" {
  name                       = "${local.transactionsQueueName}"
  visibility_timeout_seconds = 30
  message_retention_seconds  = 86400
}

resource "aws_lambda_event_source_mapping" "transaction-sqs-event-source" {
  function_name = "arn:aws:lambda:${var.region}:${var.accountId}:function:psp-service-${var.environment}-processTransactionsQueue"
  enabled = true
  batch_size = 1
  event_source_arn = "${aws_sqs_queue.transactions.arn}"
}
