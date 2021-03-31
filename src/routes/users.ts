import { Router } from 'express';
import { getUser, createUser, updateUser, deleteUser} from '../controllers/users'

const router = Router();


router.get('/', getUser);

router.post('/', createUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;
