import express from 'express';
import FriendShipController from '../controller/FriendShipController.js';
const router = express.Router();
router.get('/friends/:userId', FriendShipController.getFriendsByUserId);
export default router;