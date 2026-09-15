const configuredBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001'; // Default to localhost if not set in environment variables

const config = {
  baseUrl: configuredBaseUrl.replace(/\/$/, ''),
};
//  'https://backend.sahas.coop.np'

export default config;
