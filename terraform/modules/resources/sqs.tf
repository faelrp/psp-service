locals {
  transactionsQueueName = "transactions-${var.environment}"
  creditCardOpsQueueName = "credit-card-ops-${var.environment}"
  debitCardOpsQueueName = "debit-card-ops-${var.environment}"
  balanceConsolidationQueueName = "balance-consolidation-${var.environment}"
}

resource "aws_sqs_queue" "transactions_dlq" {
  name                       = "${local.transactionsQueueName}-dead-letter"
  visibility_timeout_seconds = 30
  message_retention_seconds  = 1209600
}

resource "aws_sqs_queue" "transactions" {
  name                       = "${local.transactionsQueueName}"
  visibility_timeout_seconds = 30
  message_retention_seconds  = 86400
  redrive_policy             = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.transactions_dlq.arn}\",\"maxReceiveCount\":2}"
}

resource "aws_lambda_event_source_mapping" "transaction-sqs-event-source" {
  function_name = "arn:aws:lambda:${var.region}:${var.accountId}:function:psp-service-${var.environment}-processTransactionsQueue"
  enabled = true
  batch_size = 1
  event_source_arn = "${aws_sqs_queue.transactions.arn}"
}

resource "aws_sqs_queue" "creditCardOperations_dlq" {
  name                       = "${local.creditCardOpsQueueName}-dead-letter"
  visibility_timeout_seconds = 30
  message_retention_seconds  = 1209600
}

resource "aws_sqs_queue" "creditCardOperationsQueue" {
  name                       = "${local.creditCardOpsQueueName}"
  visibility_timeout_seconds = 30
  message_retention_seconds  = 86400
  redrive_policy             = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.creditCardOperations_dlq.arn}\",\"maxReceiveCount\":2}"
}

resource "aws_lambda_event_source_mapping" "credit-card-ops-sqs-event-source" {
  function_name = "arn:aws:lambda:${var.region}:${var.accountId}:function:psp-service-${var.environment}-processCreditCardOpsQueue"
  enabled = true
  batch_size = 1
  event_source_arn = "${aws_sqs_queue.creditCardOperationsQueue.arn}"
}

resource "aws_sqs_queue" "debitCardOperationsQueue_dlq" {
  name                       = "${local.debitCardOpsQueueName}-dead-letter"
  visibility_timeout_seconds = 30
  message_retention_seconds  = 1209600
}

resource "aws_sqs_queue" "debitCardOperationsQueue" {
  name                       = "${local.debitCardOpsQueueName}"
  visibility_timeout_seconds = 30
  message_retention_seconds  = 86400
  redrive_policy             = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.debitCardOperationsQueue_dlq.arn}\",\"maxReceiveCount\":2}"
}
resource "aws_lambda_event_source_mapping" "debit-card-ops-sqs-event-source" {
  function_name = "arn:aws:lambda:${var.region}:${var.accountId}:function:psp-service-${var.environment}-processDebitCardOpsQueue"
  enabled = true
  batch_size = 1
  event_source_arn = "${aws_sqs_queue.debitCardOperationsQueue.arn}"
}

resource "aws_sqs_queue" "balanceConsolidationQueue_dlq" {
  name                       = "${local.balanceConsolidationQueueName}-dead-letter"
  visibility_timeout_seconds = 30
  message_retention_seconds  = 1209600
}

resource "aws_sqs_queue" "balanceConsolidationQueue" {
  name                       = "${local.balanceConsolidationQueueName}"
  visibility_timeout_seconds = 30
  message_retention_seconds  = 86400
  redrive_policy             = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.balanceConsolidationQueue_dlq.arn}\",\"maxReceiveCount\":2}"
}
resource "aws_lambda_event_source_mapping" "balance-consolidation-sqs-event-source" {
  function_name = "arn:aws:lambda:${var.region}:${var.accountId}:function:psp-service-${var.environment}-processBalanceConsolidationQueue"
  enabled = true
  batch_size = 1
  event_source_arn = "${aws_sqs_queue.balanceConsolidationQueue.arn}"
}
