locals {
  profile = "bertelli" // TODO: update profile
  region = "us-east-1"
}

provider "aws" {
  version = "~> 2.6.0"
  region  = "${local.region}"
  profile = "${local.profile}"
}

module "resources" {
  source = "../../modules/resources"

  region      = "${local.region}"
  environment = "dev"
}
