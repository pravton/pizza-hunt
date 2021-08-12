const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');

// /api/commetns/<pizzaId>
router.route('/:pizzaId').post(addComment);

// /api/commetns/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;