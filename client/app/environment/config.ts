export const dev = {
  context: "https://8lomsjt0a6.execute-api.us-west-2.amazonaws.com/dev/"
 };export const prod = {
  context: "https://8lomsjt0a6.execute-api.us-west-2.amazonaws.com/prod/"
 };export const environment = process.env.NODE_ENV === "production" ? prod : dev;