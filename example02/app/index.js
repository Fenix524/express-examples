import express from 'express'
import { userRouter } from './routes/userRouter.js'

const app = express()
const PORT = 3002

app.use(express.json())

app.get('/ping', (req, res) => {
	res.send('Привіт')
})

const PATH_PREFIX = '/api/vi'

app.use(`${PATH_PREFIX}/users`, userRouter)

app.listen(PORT, () => {
	console.log(`Сервер запущений на порту ${PORT}`)
})
