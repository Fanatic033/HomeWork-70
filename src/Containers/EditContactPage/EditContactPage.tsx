import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks.ts';
import {RootState} from '../../store/store.ts';
import {useEffect, useState} from 'react';
import {fetchOneContact, OneContact} from '../../Slice/ContactSlice.ts';
import ContactForm from '../../Components/ContactForm/ContactForm.tsx';

const EditContactPage = () => {
  const {id} = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector((state) => state.contacts.isLoading);
  const [initContact, setInitContact] = useState<OneContact | undefined>(undefined);
  const selectedContact = useAppSelector((state: RootState) => state.contacts.contacts.find(
    contact => contact.id === id
  ));

  useEffect(() => {
    if (selectedContact) {
      setInitContact(selectedContact);
    }
  }, [selectedContact]);

  const onSubmit = (contact: OneContact) => {
    if (id) {
      dispatch(fetchOneContact({...contact, id}));
      navigate('/');
    }
  };
  return (
    <>
      <ContactForm isLoading={isLoading} onSubmit={onSubmit} existingContact={initContact}/>
    </>
  );
};

export default EditContactPage;