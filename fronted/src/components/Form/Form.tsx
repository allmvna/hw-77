import Grid from "@mui/material/Grid2";
import {Button, TextField} from "@mui/material";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {sendMessages} from "../../slices/messageSlice/messageSlice.tsx";
import FileInput from "../FileInput/FileInput.tsx";

const initialState = {
    author: '',
    message: '',
    image: null
};

const MessageForm = () => {
    const [formData, setFormData] = useState(initialState);
    const { isLoading } = useAppSelector((state) => state.list);
    const dispatch = useAppDispatch();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const fileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setFormData(prevState => ({
                ...prevState, [name]: files[0]
            }));
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { message } = formData;

        if (!message.trim()) {
            return;
        }

        try {
            await dispatch(sendMessages(formData));
            setFormData(initialState);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        mx: "auto",
                        width: "60%",
                        border: "3px solid #001f3d",
                        borderRadius: "10px",
                        p: 3,
                        mt: 3
                    }}
                >

                    <Grid size={12}>
                        <TextField
                            sx={{
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                            }}
                            onChange={onChange}
                            value={formData.author}
                            id="author"
                            label="Author"
                            variant="outlined"
                            name="author"
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            sx={{
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                            }}
                            onChange={onChange}
                            value={formData.message}
                            multiline
                            id="message"
                            label="Message"
                            variant="outlined"
                            name="message"
                            required
                        />
                    </Grid>
                    <Grid size={8}>
                        <FileInput
                            label="Image"
                            name="image"
                            onChange={fileInputChange}
                        />
                    </Grid>
                    <Grid size={12} textAlign='center'>
                        <Button
                            type='submit'
                            size='large'
                            variant="contained"
                            disabled={isLoading}
                            color="success"
                        >
                           Send
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default MessageForm;