import { POST_CATEGORIES } from '../utils/constants/postCategories.js';
export const getPostCategories = (req, res) => {
	res.json(POST_CATEGORIES);
};
