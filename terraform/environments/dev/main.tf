locals {
  profile = "bertelli" // TODO: update profile
  region = "us-east-1"
  accountId = "957104647697" // TODO: update here
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
