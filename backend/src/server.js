const express = require('express')
const app = express()
const indexRouter = require('./routes/index');


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/api', indexRouter);


app.listen(3000, () => {
  console.log('Start server at port 3000.')
})