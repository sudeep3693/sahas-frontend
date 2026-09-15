const configuredBaseUrl = process.env.REACT_APP_API_URL || 'https://backend.sahas.coop.np';

const config = {
  baseUrl: configuredBaseUrl.replace(/\/$/, ''),
};

export default config;
