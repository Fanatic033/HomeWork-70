import ContactList from '../../Components/ContactList/ContactList.tsx';
import {useState} from 'react';
import Modal from '../../Components/Modal/Modal.tsx';
import {OneContact} from '../../Slice/ContactSlice.ts';
import {useAppSelector} from '../../hooks/reduxHooks.ts';
import {RootState} from '../../store/store.ts';
import Spinner from '../../Components/Spinner/Spinner.tsx';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<OneContact | null>(null);
  const isLoading = useAppSelector((state: RootState) => state.contacts.isLoading);

  const openModal = (contact: OneContact) => {
    setShowModal(true);
    setSelectedContact(contact);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };
  return (
    <>
      <div className="container">
        <ContactList openModal={openModal}/>
        {isLoading && <div className={'d-flex justify-content-center align-items-center mt-5'}><Spinner/></div>}
        {showModal && selectedContact && (
          <Modal title={'Details'} onClose={closeModal} show={showModal}>
            <div className="d-flex flex-row align-items-center">
              <div>
                <img src={selectedContact.image} alt={selectedContact.name} style={{width: '250px', height: '100%'}}
                     className={''}/>
              </div>
              <div className="d-flex align-items-center flex-column">
                <p>Name: {selectedContact.name}</p>
                <p>Email: {selectedContact.email}</p>
                <p>Phone: {selectedContact.phone}</p>
              </div>
            </div>
            <hr/>
            <div className="mt-3 text-center mb-3">
              <button type={'button'} className={'btn btn-warning  mx-3'}>Edit</button>
              <button type={'button'} className={'btn btn-danger mx-3'}>Delete</button>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default HomePage;