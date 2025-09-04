import express from "express";
import folders from "./api/folders.js"
import files from "./api/files.js"

const app = express();

app.use(express.json());

app.use("/", folders); 
app.use("/", files);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
})


export default app;
