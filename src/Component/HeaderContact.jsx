import React from 'react';
import { MdEmail } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';

const ContactIcons = ({ email, phone }) => {
  return (
    <div className="d-flex align-items-center gap-4 text-black ms-xs-1 ms-md-5">
      <div className="d-flex align-items-center gap-2">
        <FiPhone className="text-white" size={20} width={600} />
        <a href={`tel:${phone}`} className="text-white text-decoration-none">
          {phone}
        </a>
      </div>
      <div className="d-flex align-items-center gap-2">
        <MdEmail className="text-white" size={20} />
        <a href={`mailto:${email}`} className="text-white text-decoration-none">
          {email}
        </a>
      </div>
    </div>
  );
};

export default ContactIcons;
