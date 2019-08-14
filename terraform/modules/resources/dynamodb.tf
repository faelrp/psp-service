locals {
  transactionsTable = "transactions_${var.environment}"
}

resource "aws_dynamodb_table" "transactions" {
  name           = "${local.transactionsTable}"
  hash_key       = "id"
  range_key      = "hash"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "hash"
    type = "S"
  }

  stream_enabled = true
  stream_view_type = "NEW_IMAGE"
}

resource "aws_lambda_event_source_mapping" "transaction-stream-event-source" {
  event_source_arn  = "${aws_dynamodb_table.transactions.stream_arn}"
  function_name     = "arn:aws:lambda:${var.region}:${var.accountId}:function:psp-service-${var.environment}-processTransactionEvents"
  enabled           = true
  batch_size        = 1
  starting_position = "LATEST"
}
