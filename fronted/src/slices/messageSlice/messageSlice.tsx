import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";

export interface IMessage {
    author: string;
    message: string;
    image: File | null ;
}

interface MessageState {
    messages: IMessage[];
    isLoading: boolean;
    error: boolean;
}

const initialState : MessageState = {
    messages: [],
    isLoading: false,
    error: false,
};

export const fetchMessages = createAsyncThunk<IMessage[]>(
    'message/fetchMessages',
    async () => {
        const { data } = await axiosAPI.get<IMessage[]>('/messages');
        return data;
    }
);

export const sendMessages = createAsyncThunk<IMessage, IMessage>('message/sendMessages', async (message) => {
    const formData = new FormData();
    const keys = Object.keys(message) as (keyof IMessage)[];
    keys.forEach(key => {
        const value = message[key];
        if (value !== null) {
            formData.append(key, value);
        }
    });

    const { data } = await axiosAPI.post<IMessage>('/messages/new_messages', formData);
    return data;
});


export const messagesSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages = action.payload;
            })
            .addCase(fetchMessages.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(sendMessages.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(sendMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages.push(action.payload);
            })
            .addCase(sendMessages.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });

    },

});

export const messagesReducer = messagesSlice.reducer;