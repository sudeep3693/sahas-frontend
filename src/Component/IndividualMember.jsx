// components/IndividualMember.js
import React from 'react';
import '../Css/IndividualMember.css';
import config from '../Constants/config';

function IndividualMember({ name, image, position }) {
  return (
    <div className="member-card">
      <img
        src={`${config.baseUrl}/uploads/team/${image}`}
        alt={name}
        className="member-image"
      />
      <div className="member-info">
        <div className="member-name">{name}</div>
        <div className="member-position">{position}</div>
      </div>
    </div>
  );
}

export default IndividualMember;
