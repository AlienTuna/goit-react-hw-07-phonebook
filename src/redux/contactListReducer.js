// import { nanoid } from "nanoid";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllContacts } from "contactsService/contactsAPI";

export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {
        try {
            const contacts = await getAllContacts();
            console.info('###CONTACTS###',contacts)
            return contacts;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
const initialState = {
    contacts: [],
    filter: '',
}

const { createSlice } = require("@reduxjs/toolkit");

const contactListSlice = createSlice({
    name: 'contactsSlice',
    initialState,
    extraReducers: builder =>
        builder
            .addCase(fetchContacts.pending, state => { })
            .addCase(fetchContacts.fulfilled, (state, action) => { 
                state.contacts = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => { })
    // reducers: {
    //     setContacts: (state, action) => {
    //         state.contacts = action.payload;
    //     },
    //     addContact: (state, action) => {
    //         const {name, number} = action.payload;
    //         if (!name) {
    //             console.warn('name is undefined', name, number)
    //             return
    //         }
    //         const id = nanoid(4)
    //         state.contacts = [...state.contacts, { id, name, number }]
    //     },
    //     deleteContact: (state, action) => {
    //         state.contacts = state.contacts.filter(item => item.id !== action.payload)
    //     },
    //     setFilter: (state, action) => {
    //         state.filter = action.payload
    //     },
    // }
})

export const { setContacts, setFilter, addContact, deleteContact } = contactListSlice.actions;
export const contactListReducer = contactListSlice.reducer;