import { requestDeleteContact, requestGetAllContacts, requestAddContact } from "dal/requestPhonebookData";

const initialState = {
    contacts: {
        items: [],
        isLoading: false,
        error: null,
    },
    filter: '',
}

const { createSlice } = require("@reduxjs/toolkit");

const contactListSlice = createSlice({
    name: 'contactsSlice',
    initialState,
    reducers: {
        setContacts: (state, action) => {
            state.contacts = action.payload;
        },
        addContact: (state, action) => {
            const {name, number} = action.payload;
            if (!name) {
                console.warn('name is undefined', name, number)
                return
            }
            state.contacts = [...state.contacts, { name, number }]
        },
        deleteContact: (state, action) => {
            state.contacts = state.contacts.filter(item => item.id !== action.payload)
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        },
    },
    extraReducers: builder =>
        builder
            .addCase(requestGetAllContacts.pending, state => { 
                state.contacts.isLoading = true;
                state.contacts.error = null;
            })
            .addCase(requestGetAllContacts.fulfilled, (state, action) => {
                state.contacts.isLoading = false;
                state.contacts.items = action.payload;
            })
            .addCase(requestGetAllContacts.rejected, (state, action) => {
                state.contacts.isLoading = false;
                state.contacts.error = action.payload;
             })
             .addCase(requestDeleteContact.fulfilled, (state, action) => {
                const deletedId = action.payload.id;
                state.contacts.isLoading = false;
                state.contacts.items = state.contacts.items.filter(({id}) => id !== deletedId);
             })
             .addCase(requestAddContact.fulfilled, (state, action) => {
                const addedContact = action.payload;
                state.contacts.isLoading = false;
                state.contacts.items = [...state.contacts.items, addedContact];
             })
})

export const { setContacts, setFilter, addContact, deleteContact } = contactListSlice.actions;
export const contactListReducer = contactListSlice.reducer;