const Review = require('../models/review')

const reviewService = {
    getAllReviews: async () => {
        return await Review.find()
        .populate("userId" , 'username email role')
        .populate("dishId" , 'dishName coverImage cuisine price availability');
    },

    getReviewById: async (id) => {
        return await Review.findById(id).populate("dishId").populate("userId");
    },

    getReviewsByUserId: async (userId) => {
        return await Review.find({ userId }).populate("dishId");
    },

    getReviewsByDishId: async (dishId) => {
        return await Review.find({ dishId }).populate("userId", 'username email');
    },

    addReview: async (data) => {
        const review = new Review(data);
        return await review.save();
    },

    updateReview: async (id, data) => {
        return await Review.findByIdAndUpdate(id, data, { new: true });
    },

    deleteReview: async (id) => {
        return await Review.findByIdAndDelete(id);
    },
};

module.exports =  reviewService;

