const express = require('express')
const session = require('express-session')
const methodOverride = require('method-override')
const routes = require('./routes')
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
const app = express()

require('./config/mongoose')
// console.log(process.env)

const PORT = process.env.PORT || 3000

const exphbs = require('express-handlebars')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(
  session({ secret: 'ThisIsMySecret', resave: false, saveUninitialized: true })
)
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes)

app.listen(PORT, () => {
  console.log(`express is running on http://localhost:${PORT}`)
})
