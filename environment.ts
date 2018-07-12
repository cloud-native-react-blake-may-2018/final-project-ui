const dev = {
  context: `http://localhost:${process.env.NODE_PORT}`
}
const prod = {
  context: 'https://dwea2klqp52vb.cloudfront.net'
  // context: 'http://cloud-native-project-3-ui.s3-website.us-east-2.amazonaws.com'
}

export const environment = process.env.NODE_ENV === 'production' ? prod : dev
