export default (req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Origin', 'http://localhost:4040')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept-Language, Accept, x-xsrf-token')
  res.header('Access-Control-Allow-Credentials', 'true')

  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  }
  else {
    next()
  }
}
