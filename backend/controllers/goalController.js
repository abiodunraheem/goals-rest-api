const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const Goal = require('../models/goalsModel')

// @ges Get Goals
// @route Get /api/goals
// @access Private
const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})

// @des Set Goal
// @route post /api/goal
// @access Private
const setGoal = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text
    })

    res.status(200).json(goal)
})

// @des Update Goal
// @route PUT /api/goals
// @access Private
const updateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    // check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    // match logged in users with goals
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorised')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal)
})

// @des delete Goal
// @route delete /api/goals
// @access Private
const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    // check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    // match logged in users with goals
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorised')
    }

    await goal.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}

