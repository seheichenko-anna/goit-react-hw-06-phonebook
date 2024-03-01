import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, selectContacts } from '../../redux/contactsSlice';
import { selectFilter } from '../../redux/filterSlice';
import ContactListItem from './ContactListItem/ContactListItem';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = filter
    ? contacts.filter(item => item.name.toLowerCase().includes(filter))
    : contacts;

  return (
    <ul>
      {filteredContacts.map(({ id, name, number }) => (
        <ContactListItem
          key={id}
          id={id}
          name={name}
          number={number}
          onDeleteContact={handleDeleteContact}
        />
      ))}
    </ul>
  );
};

export default ContactList;
