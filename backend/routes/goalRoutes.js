const express = require('express')
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
router.route('/').get(protect, getGoals).post(protect, setGoal)


router.route('/:id').put(updateGoal).delete(protect, deleteGoal)

module.exports = router
