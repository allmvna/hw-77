import {Message} from "./types";
import {promises as fs} from "fs";

const fileName = "./db.json";
let data: Message[] = [];

const fileDb = {
    async init() {
        try {
            const fileContent = await fs.readFile(fileName);
            data = JSON.parse(fileContent.toString());
        } catch (error) {
            console.error(error);
            data = [];
           await this.saveMessages();
        }
    },

    async getMessages() {
        return data;
    },

    async addMessage(item: Message) {

        const newMessage: Message = {
            message: item.message,
            author: item.author,
            image: item.image,
        };

        data.push(newMessage);

        try {
            await this.saveMessages();
            return newMessage;
        } catch (error) {
            console.error(error);
        }
    },

    async saveMessages() {
        try {
            await fs.writeFile(fileName, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
            console.error(error);
        }
    },
};

export default fileDb;
