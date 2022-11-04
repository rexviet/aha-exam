variable "profile" {
  type        = string
  description = "AWS profile to use"
}

variable "region" {
  type        = string
  description = "AWS region create resources"
}

variable "create_dlq" {
  type    = bool
  default = false
}

variable "fifo_topic" {
  type        = bool
  description = "Flag to create a topic as FIFO or normal"
  default     = false
}
