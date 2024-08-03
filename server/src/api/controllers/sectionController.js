const Section = require('../models/section')
const Task = require('../models/task')

exports.getSectionByBoard = async (req, res) => {
  const { boardId } = req.params
  try {
    const sections = await Section.find({ board: boardId })
    for (const section of sections) {
      const tasks = await Task.find({ section: section.id }).populate('section').sort('-position')
      section._doc.tasks = tasks
    }
    res.status(200).json(sections)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.create = async (req, res) => {
  const { boardId } = req.params
  try {
    const section = await Section.create({ board: boardId })
    section._doc.tasks = []
    res.status(201).json(section)
  } catch (err) {
    res.status(500).josn(err)
  }
}

exports.update = async (req, res) => {
  const { sectionId } = req.params
  try {
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { $set: req.body }
    )
    section._doc.tasks = []
    res.status(200).json(section)
  } catch (err) {
    res.status(500).josn(err)
  }
}

exports.delete = async (req, res) => {
  const { sectionId } = req.params
  try {
    await Task.deleteMany({ section: sectionId })
    await Section.deleteOne({ _id: sectionId })
    res.status(200).json('deleted')
  } catch (err) {
    res.status(500).josn(err)
  }
}