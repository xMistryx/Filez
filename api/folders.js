import express from "express";
import {getFolders, getFolderById, getFoldersIncludingFiles} from "#db/queries/folders";

const router = express.Router();

router
.route("/folders")
.get(async (req, res) => {
    const folders = await getFolders();
    res.send(folders);
});

router
.route("/folders/:id")
.get(async (req, res) => {
    try {
        const {id} = req.params;
        const folder = await getFolderById(id);
        if (!folder) {
            return res.status(404).send({ message: "Folder not found" });
        }
        const response = await getFoldersIncludingFiles(id);
        return res.send(response);
    } catch (error) {
        return res.status(400).send(error.message);
    }
})

export default router;