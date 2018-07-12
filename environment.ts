const dev = {
  context: `http://localhost:${JSON.stringify(process.env.NODE_ENV)}`
}
const prod = {
  context: 'http://cloud-native-project-3-ui.s3-website.us-east-2.amazonaws.com'
}

export const environment = process.env.NODE_ENV === 'production' ? prod : dev
