# resource "aws_sns_topic" "gather-game-every-min" {
#   name = "${terraform.workspace}-gather-game-every-min"
# }

resource "aws_sns_topic" "cdc-user-created" {
  name = "${terraform.workspace}-cdc-user-created"
}
