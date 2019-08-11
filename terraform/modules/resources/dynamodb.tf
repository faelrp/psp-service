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
}
