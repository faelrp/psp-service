locals {
  profile = "AWS_PROFILE_GOES_HERE"
  region = "us-east-1"
  accountId = "AWS_ACCOUNT_GOES_HERE"
}

provider "aws" {
  version = "~> 2.6.0"
  region  = "${local.region}"
  profile = "${local.profile}"
}

module "resources" {
  source = "../../modules/resources"

  region      = "${local.region}"
  accountId   = "${local.accountId}"
  environment = "dev"
}
