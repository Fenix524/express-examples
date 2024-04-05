import express from 'express'
import path from 'path'
import { promises as fs } from 'fs'

const app = express()
const PORT = 3002
const DB_PATH = './db/contacts.json'

app.use(express.json())
app.use(async (req, res, next) => {
	try {
		const usersData = await fs.readFile(DB_PATH, 'utf8')
		req.users = JSON.parse(usersData)
		next()
	} catch (error) {
		console.error('Помилка при читанні файлу:', error)
		res.status(500).send('Внутрішня помилка сервера')
	}
})

app.get('/ping', (req, res) => {
	res.send('Привіт')
})

app.get('/users', async (req, res) => {
	res.json(req.users)
})

app.get('/users/:id', (req, res) => {
	const { users } = req
	const { id } = req.params

	res.json({
		user: users.find(user => user.id === id),
	})
})

app.post('/users', async (req, res) => {
	try {
		const { body, users } = req
		console.log()
		const newUser = {
			id: `${Date.now()}`,
			...body,
		}
		users.push(newUser)
		await fs.writeFile(DB_PATH, JSON.stringify(users))

		res.json({
			status: 200,
			newUser: newUser,
		})
	} catch (error) {
		console.error('Помилка при додаванні користувача:', error)
		res.status(400).json({
			status: 400,
			error: 'Помилка при додаванні користувача',
		})
	}
})

app.delete('/users/:id', async (req, res) => {
	try {
		const { id } = req.params
		const { users } = req

		const newArr = users.filter(user => user.id !== id)
		await fs.writeFile(DB_PATH, JSON.stringify(newArr))

		res.json({
			status: 200,
			deleteUser: 'seccess',
		})
	} catch (error) {
		console.log(error)
		res.status(400).json({
			status: 400,
			error: 'Помилка при видаленні користувача',
		})
	}
})

app.listen(PORT, () => {
	console.log(`Сервер запущений на порту ${PORT}`)
})
