const Board = require('../models/board')

exports.create = async (req, res) => {
    try {
        const boardCount = await Board.countDocuments()
        const board = await Board.create({
            user: req.user._id,
            position: boardCount > 0 ? boardCount : 0,
        })
        res.status(201).json({
            message: "Thêm bảng thành công",
            error: false,
            success: true,
            data: board
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        const boards = await Board.find({ user: req.user._id }).sort('-position')
        res.status(200).json({
            message: "Danh sách bảng",
            error: false,
            success: true,
            data: boards
        })
    } catch (err) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

exports.updatePosition = async (req, res) => {
    const { boards } = req.body
    try {
        for (const key in boards.reverse()) {
            const board = boards[key]
            await Board.findByIdAndUpdate(
                board.id,
                { $set: { position: key } }
            )
        }
        res.status(200).json('updated')
    } catch (err) {
        res.status(500).json(err)
    }
}

