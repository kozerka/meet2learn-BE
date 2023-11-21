import express from 'express';
import { sendContactForm } from '../controllers/contactController.js';
const contactRouter = express.Router();

contactRouter.post('/', sendContactForm);

export default contactRouter;
