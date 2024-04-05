import { Router } from 'express'
import {
	addOneUser,
	getAllUsers,
	getUserById,
} from '../controllers/userController.js'
import { getUsersMiddleware } from '../middlewares/userMiddlewares.js'

const router = Router()

router
	.use('/', getUsersMiddleware)
	.route('/') //
	.post(addOneUser)
	.get(getAllUsers)

router.route('/:id').get(getUserById)

export { router as userRouter }
