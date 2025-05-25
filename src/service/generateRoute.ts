const GenerateData = (role: string, id: string, token: string): string => {
  return `?role=${role}&id=${id}&token=${token}`;
};

export default GenerateData;
