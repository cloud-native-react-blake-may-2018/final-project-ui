const dev = {
  context: `http://localhost:3222`
}
const prod = {
  context: 'https://dwea2klqp52vb.cloudfront.net'
}

// possible solution to invalidating the cache; add a query parameter
// const prod = {
//   context: 'https://dwea2klqp52vb.cloudfront.net?v=2'
// }

export const environment = process.env.NODE_ENV === 'production' ? prod : dev
