import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

function SocialIcons() {
  return (
   <div style={{justifyContent:'center', alignContent:'center', marginRight:'60px'}}>
 <div style={{ display: 'flex', gap: '20px', fontSize: '24px', marginBottom: '4px', float:'right'}}>
      <a href="https://www.facebook.com/sahascoop.com.np" target="_blank" rel="noopener noreferrer">
        <FaFacebookF color="white" />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram color="white" />
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter color="white" />
      </a>
    </div>
   </div>

   
  );
}

export default SocialIcons;
