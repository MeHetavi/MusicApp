import { Router } from 'express';
import auth_routes from './auth.routes';
import user_routes from './user.routes';
import album_routes from './album.routes';
import song_routes from './song.routes';
import genre_routes from './genre.routes';
import category_routes from './category.routes';
const router = Router();

router.use('/auth', auth_routes);
router.use('/user', user_routes);
router.use('/album', album_routes);
router.use('/song', song_routes);
router.use('/genre', genre_routes);
router.use('/category', category_routes);

export default router;
