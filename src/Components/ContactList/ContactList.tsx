import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks.ts';
import {RootState} from '../../store/store.ts';
import {useEffect} from 'react';
import {fetchContacts, OneContact} from '../../Slice/ContactSlice.ts';
import ContactItem from '../ContactItem/ContactItem.tsx';

const ContactList = () => {
  const dispatch = useAppDispatch();
  const Contacts = useAppSelector((state: RootState) => state.contacts.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div>
      <h3 className={'mt-4'}>Contacts List</h3>
      {Contacts.map((contact: OneContact) => (
        <ContactItem contact={contact} key={contact.name}/>
      ))}
    </div>
  );
};

export default ContactList;