const asyncHandler = require('express-async-handler')

// @des Get Goals
// @route Get /api/goals
// @access Private
const getGoals = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'Get goals' })
})

// @des Set Goal
// @route post /api/goal
// @access Private
const setGoal = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('please add a text field')
    }

    res.status(200).json({ message: 'Set goal' })
})

// @des Update Goal
// @route PUT /api/goals
// @access Private
const updateGoal = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}` })
})

// @des delete Goal
// @route delete /api/goals
// @access Private
const deleteGoal = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}` })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}

