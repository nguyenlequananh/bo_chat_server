import express from 'express';
import FriendShipController from '../controller/FriendShipController.js';
const router = express.Router();
router.get('/friends/:userId', FriendShipController.getFriendsByUserId);
router.get('/search', FriendShipController.getFriendshipByKeyword);
export default router;