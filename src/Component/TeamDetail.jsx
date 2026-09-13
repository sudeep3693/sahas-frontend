import React, { useEffect, useState } from 'react';
import IndividualMember from './IndividualMember';
import '../Css/TeamDetail.css';
import config from '../Constants/config';
import axios from 'axios';

function TeamDetail({ type }) {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!type) return;
    setLoading(true);
    axios.get(`${config.baseUrl}/teamDetail/category/${type}`)
      .then(res => setTeamData(res.data))
      .catch(err => console.error('Failed to load team data', err))
      .finally(() => setLoading(false));
  }, [type]);

  if (loading) {
    return <div className="team-loading">Loading...</div>;
  }

  if (teamData.length === 0) {
    return <p className="team-empty">No members listed yet.</p>;
  }

  return (
    <div className="team-list-container">
      {/* Header row */}
      <div className="team-list-header">
        <span className="team-list-header-sn">क्र.सं.</span>
        <span className="team-list-header-name">नाम</span>
        <span className="team-list-header-position">पद</span>
        <span className="team-list-header-contact">सम्पर्क</span>
      </div>

      {/* Data rows */}
      {teamData.map((person, idx) => (
        <IndividualMember
          key={person._id || idx}
          serialNo={idx + 1}
          name={person.name}
          position={person.position}
          contactNumber={person.contactNumber}
        />
      ))}
    </div>
  );
}

export default TeamDetail;
