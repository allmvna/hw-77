import express from "express";
import fileDb from "../fileDb";
import {Message} from "../types";
import {imagesUpload} from "../multer";

const messagesRouter = express.Router();

messagesRouter.get("/", async (req, res) => {
    const messages = await fileDb.getMessages();
    res.send(messages);
});

messagesRouter.post("/new_messages", imagesUpload.single('image'),  async (req, res) => {
    const { message, author } = req.body;

    if (!message || message.trim() === "") {
        res.status(400).send({ error: "Message must be present in the request" });
        return;
    }

    const nameAuthor = author && author.trim() !== "" ? author : "Anonymous";


    const newMessage: Message = {
        message,
        author: nameAuthor,
        ...(req.file && { image: req.file.filename }),
    }

    try {
        const savedMessage = await fileDb.addMessage(newMessage);
        res.send(savedMessage);
    } catch (error) {
        console.error(error);
    }
});

export default messagesRouter;
