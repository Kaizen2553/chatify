import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getAllContacts , getMessagesById , sendMessage , getChatPartners } from '../controllers/message.controller.js';
const router = express.Router();
router.use(protectRoute);

router.get('/contacts',protectRoute,getAllContacts);
router.get('/chats',protectRoute,getChatPartners);
router.get('/:id',protectRoute,getMessagesById);
router.post('/send/:id',protectRoute,sendMessage);

export default router;