import { useDispatch, useSelector } from "react-redux";
import { ContactListItem } from "../ContactList/ContactListItem";
import { EmptyTxt } from "./ContactList.styled";
import { useEffect } from "react";
import { fetchContacts } from "redux/contactListReducer";

export function ContactList() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch])

    const contacts = useSelector((state) => state.contactList.contacts);
    const filterWord = useSelector((state) => state.contactList.filter)

    const filterContactsByName = () => {
        console.warn(contacts)
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
                        number={phone}
                    />
                ))
                : (<EmptyTxt>Contact list is empty</EmptyTxt>)
            }
        </ul>
    )
}