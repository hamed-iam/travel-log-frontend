const API_URL = 'http://localhost:1337';

export const listLogEntries = async () => {
  const response = await fetch(`${API_URL}/api/logs`);

  return response.json();
};
