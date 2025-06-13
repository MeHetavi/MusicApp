import { authenticate } from "../middleware/auth.middleware";
import { Router } from "express";
import { getSong, setFavourite, setDownloaded, getMySongs, createMusic, updateSong } from "../controllers/song.controller";
import { uploadMusic } from "../middleware/upload.middleware";
import { uploadMusicSchema, updateMusicSchema } from "../zod/song.validator";
import { validateBody } from "../middleware/zod.middleware";
const router = Router();

router.use(authenticate)
router.get('/get/:song_id', getSong);
router.post('/favourite/:song_id', setFavourite);
router.post('/download/:song_id', setDownloaded);


router.use(uploadMusic)
router.post('/upload-song', validateBody(uploadMusicSchema), createMusic);
router.get('/my-songs', getMySongs);
router.put('/update-song/:song_id', validateBody(updateMusicSchema), updateSong);

export default router;