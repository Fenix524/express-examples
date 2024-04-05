import { promises as fs } from 'fs'
const DB_PATH = './app/db/contacts.json'

export const getUsersMiddleware = async (req, res, next) => {
	try {
		const usersData = await fs.readFile(DB_PATH, 'utf8')
		req.users = JSON.parse(usersData)
		next()
	} catch (error) {
		console.error('Помилка при читанні файлу:', error)
		res.status(500).send('Внутрішня помилка сервера')
	}
}
