const router  = require('express').Router();
const {getAllReviews,
    getReviewById,
    getReviewsByUserId,
    getReviewsByDishId,
    addReview,
    updateReview,
    deleteReview,} = require('../controllers/reviewController')

router.get("/getAllReviews", getAllReviews);
router.get("/getReviewById/:id", getReviewById);
router.get("/getReviewsByUserId/:userId", getReviewsByUserId);
router.get("/getReviewsByDishId/:dishId", getReviewsByDishId);
router.post("/addReview", addReview);
router.put("/updateReview/:id", updateReview);
router.delete("/deleteReview/:id", deleteReview);


module.exports = router;