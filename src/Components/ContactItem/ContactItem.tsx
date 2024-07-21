import {OneContact} from '../../Slice/ContactSlice.ts';
import {FC} from 'react';

interface Props {
  contact: OneContact;
}

const ContactItem: FC<Props> = ({contact}) => {
  return (
    <div className="card mb-4 mt-4 w-50" onClick={() => console.log('hi')}>
      <div className="d-flex align-items-center">
        <img src={contact.image} className="card-img-left" alt="img" style={{width: '140px', marginRight: '20px'}}/>
        <div className="card-body">
          <h5 className="card-title">{contact.name}</h5>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;