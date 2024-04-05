const DB_PATH = './app/db/contacts.json'
import { promises as fs } from 'fs'

export const getAllUsers = async (req, res) => {
	res.json(req.users)
}

export const getUserById = (req, res) => {
	const { users } = req
	const { id } = req.params

	res.json({
		user: users.find(user => user.id === id),
	})
}

export const addOneUser = async (req, res) => {
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
}

export const deleteUserById = async (req, res) => {
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
}
