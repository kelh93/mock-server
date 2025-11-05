const Koa = require('koa')
const Router = require('@koa/router')
const cors = require('@koa/cors')
const fs = require('fs')
const path = require('path')

const app = new Koa()
const router = new Router()

app.use(cors())

const mockDir = path.join(__dirname, 'mock')

const loadMockRoutes = () => {
  try {
    const files = fs.readdirSync(mockDir)
    files.forEach(file => {
      if(file.endsWith('.json')) {
        const routeName = file.replace('.json', '')
        const filePath = path.join(mockDir, file)

        try {
          const mockData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

          router.get(`/${routeName}`, async (ctx) => {
            ctx.body = mockData
          })

          console.log(`Loaded mock route: ${routeName}`)
        } catch (error) {
          console.error(`Error loading mock route ${routeName}:`, error)
        }
      }
    })
  } catch (error) {
    console.error('Error loading mock routes:', error)
  }
}

loadMockRoutes()

router.get('/health', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'Mock server is running'
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

if(require.main === module) {
  const port = process.env.PORT || 5000
  app.listen(port, () => {
    console.log(`Mock server is running on port ${port}`)
    console.log('Mock Directory:', mockDir)
  })
}

// 导出app供vercel使用
module.exports = app


