import React, { useEffect, useState } from 'react';
import IndividualMember from './IndividualMember';
import '../Css/TeamDetail.css'; 
import config from '../Constants/config';
import axios from 'axios';

function TeamDetail({ type }) {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    if (!type) return;

    axios.get(`${config.baseUrl}/teamDetail/category/${type}`)
      .then(res => setTeamData(res.data))
      .catch(err => console.error('Failed to load team data', err));
  }, [type]); 

  return (
    <div className="team-container">
      {teamData.map((person, idx) => (
        <IndividualMember key={idx} name={person.name} image={person.imageName} position ={person.position} />
      ))}
    </div>
  );
}

export default TeamDetail;
