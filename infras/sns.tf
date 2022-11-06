resource "aws_sns_topic" "cdc-user-created" {
  name = "${terraform.workspace}-cdc-user-created"
}

resource "aws_sns_topic" "cdc-user-action-created" {
  name = "${terraform.workspace}-cdc-user-action-created"
}
