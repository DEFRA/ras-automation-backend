import AWS from 'aws-sdk'

AWS.config.update({
  region: 'eu-west-2',
  accessKeyId: '4nqsrasj4qi6gm2vielmq8t1pg',
  secretAccessKey: '2rll2p5jeo49nghj32at1k3bhp3vdnk7s1m5cptnb0p6csurkus'
})

export const sqs = new AWS.SQS()

export const queueUrl =
  'https://sqs.eu-west-2.amazonaws.com/332499610595/ras_automation_backend'
