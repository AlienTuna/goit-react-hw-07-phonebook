import { useDispatch, useSelector } from "react-redux";
import { ContactListItem } from "../ContactList/ContactListItem";
import { EmptyTxt } from "./ContactList.styled";
import { useEffect } from "react";
import { requestGetAllContacts } from "dal/requestPhonebookData";

export function ContactList() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(requestGetAllContacts())
    }, [dispatch])

    const contacts = useSelector((state) => state.contactList.contacts.items);
    const filterWord = useSelector((state) => state.contactList.filter)

    const filterContactsByName = () => {
        const ff = filterWord.toLowerCase() ?? '';
        return contacts.filter(contact => contact.name.toLowerCase().includes(ff))
    }

    const list = filterContactsByName();

    return (
        <ul>
            {list.length
                ? (list.map(({ id, name, phone }) =>
                    <ContactListItem
                        key={id}
                        id={id}
                        name={name}
                        phone={phone}
                    />
                ))
                : (<EmptyTxt>Contact list is empty</EmptyTxt>)
            }
        </ul>
    )
}