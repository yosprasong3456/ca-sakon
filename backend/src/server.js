const express = require('express')
const app = express()
const indexRouter = require('./routes/index');
const cors = require('cors')
const cron = require('node-cron');
const personController  = require('./controllers/personController')

app.use(cors())
app.use(express.json())

const task = cron.schedule('29 23 * * *', async() =>{
  console.log('Tik');
  console.log('Run task every minute');
  personController.cornJopUpload()
}, {
  scheduled: true,
  timezone: "Asia/Bangkok"
});
task.start()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/api', indexRouter);


app.listen(3000, () => {
  console.log('Start server at port 3000.')
})