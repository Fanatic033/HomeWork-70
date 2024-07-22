import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks.ts';
import {useNavigate} from 'react-router-dom';
import {RootState} from '../../store/store.ts';
import ContactForm from '../../Components/ContactForm/ContactForm.tsx';
import {OneContact, postContacts} from '../../Slice/ContactSlice.ts';

const AddContactPage = () => {
  const isLoading = useAppSelector((state: RootState) => state.contacts.isLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSave = (contact: OneContact) => {
    dispatch(postContacts(contact));
    navigate('/');
  };
  return (
    <ContactForm isLoading={isLoading} onSubmit={onSave}/>
  );
};

export default AddContactPage;
