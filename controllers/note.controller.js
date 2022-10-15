const note = require("../models/note");
const db = require('../models/index')
const noteModel = note(db.sequelize);

const getAllNotes = async (req, res) => {
    try{
            const notes = await noteModel.findAll({
                where: {isDeleted: false}
            });
        res.status(200).json({data: notes})
    } catch (e){
        console.log(e)
    }
}

const getNote = async (req, res) => {
    try {
        const note = await noteModel.findOne({
            where: {
                id: req.params.id,
                isDeleted: false
            }
        });
        console.log(note)
        res.status(200).json({data: note})
    } catch (e){
        console.log(e)
    }
}

const createNote = async (req, res) => {
    try{
        const note = await noteModel.create({
            subject: req.body.subject,
            detail: req.body.detail,
        });
        res.status(201).json({data: note})
    } catch (e){
        console.log(e)
    }
}

const updateNote = async (req, res) => {
    try{
        const note = await noteModel.findOne({
            where: {
                id: req.params.id,
                isDeleted: false
            }
        });
        if (!note) {
            res.status(404).json({data: null})
            return;
        }

        await note.update({
            subject: req.body.subject,
            detail: req.body.detail,
            isDeleted: false,
        })
        await note.save();
        res.status(200).json({data: note})
    } catch (e){
        console.log(e)
    }
}

const softDeleteNote = async (req, res) => {
    try{
        const note = await noteModel.findOne({
            where: {
                id: req.params.id,
                isDeleted: false
            }
        });

        if (!note) {
            res.status(404).json();
            return;
        }

        await note.update({
            isDeleted: true,
        })
        await note.save();
        res.status(204).json();
    } catch (e){
        console.log(e)
    }
}

module.exports = {
    getAllNotes,
    getNote,
    createNote,
    updateNote,
    softDeleteNote
}
