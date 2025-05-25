const GenerateToken = (role: string, id: string): string => {
  const payload = JSON.stringify({ role, id });
  return btoa(payload);
};

export default GenerateToken;
