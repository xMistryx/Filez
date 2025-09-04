import express from "express";
import {createFile, getFilesIncludingFolderName} from "#db/queries/files";
import {getFolderById} from "#db/queries/folders";

const router = express.Router();

router
.route("/files")
.get(async (req, res) => {
    const files = await getFilesIncludingFolderName();
    res.send(files);
});

router
.route("/folders/:id/files")
.post(async (req, res) => {
    try {
        const {name, size} = req.body;
        const {id} = req.params;
        if (!req.body || !name || !size) {
            return res.status(400).send({ message: "Missing required fields" });
        }
        const folder = await getFolderById(id);
        if (!folder) {
            return res.status(404).send({ message: "Folder not found" });
        }
        const response = await createFile(name, size, id);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(400).send(error.message);
    }
})

export default router;