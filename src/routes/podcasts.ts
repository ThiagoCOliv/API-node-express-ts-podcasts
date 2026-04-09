import { Router } from 'express';
import { PodcastController } from '../controllers/PodcastController';

const router = Router();
const podcastController = new PodcastController();

router.get('/', podcastController.listEpisodes);

export default router;