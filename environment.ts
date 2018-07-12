const dev = {
  context: `http://localhost:3222`
}
const prod = {
  context: 'https://dwea2klqp52vb.cloudfront.net'
}

export const environment = process.env.NODE_ENV === 'production' ? prod : dev
