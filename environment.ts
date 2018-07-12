const dev = {
  context: `http://localhost:${process.env.NODE_PORT}`
}
const prod = {
  context: 'https://dwea2klqp52vb.cloudfront.net'
}

export const environment = process.env.NODE_ENV === 'production' ? prod : dev
