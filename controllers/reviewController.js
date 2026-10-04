
const reviewService = require('../services/review.service');


 const getAllReviews = async (req, res) => {
    try {
      const reviews = await reviewService.getAllReviews();
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reviews", error });
    }
  };
  
 const getReviewById = async (req, res) => {
    try {
      const review = await reviewService.getReviewById(req.params.id);
      if (!review) return res.status(404).json({ message: "Review not found" });
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ message: "Error fetching review", error });
    }
  };

  const getReviewsByUserId = async (req, res) => {
    try {
      const reviews = await reviewService.getReviewsByUserId(req.params.userId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user reviews", error });
    }
  };
  
 const getReviewsByDishId = async (req, res) => {
    try {
      const reviews = await reviewService.getReviewsByDishId(req.params.dishId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Error fetching dish reviews", error });
    }
  };
  
 const addReview = async (req, res) => {
    try {
      const newReview = await reviewService.addReview(req.body);
      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json({ message: "Error adding review", error });
    }
  };
  
 const updateReview = async (req, res) => {
    try {
      const updated = await reviewService.updateReview(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Review not found" });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: "Error updating review", error });
    }
  };
  
 const deleteReview = async (req, res) => {
    try {
      const deleted = await reviewService.deleteReview(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Review not found" });
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting review", error });
    }
  };
  
module.exports  = { addReview ,deleteReview, getAllReviews, getReviewById, getReviewsByDishId, getReviewsByUserId,updateReview}
  