import React from 'react';
import '../Css/IndividualMember.css';

function IndividualMember({ name, position, contactNumber, serialNo }) {
  return (
    <div className="member-list-row">
      <span className="member-serial">{serialNo}</span>
      <div className="member-list-info">
        <span className="member-list-name">{name}</span>
        <span className="member-list-position">{position}</span>
      </div>
      {contactNumber ? (
        <a href={`tel:${contactNumber}`} className="member-list-contact">
          📞 {contactNumber}
        </a>
      ) : (
        <span className="member-list-contact-empty">—</span>
      )}
    </div>
  );
}

export default IndividualMember;
