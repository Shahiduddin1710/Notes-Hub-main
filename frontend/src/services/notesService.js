const BASE_URL = "http://localhost:8000/api/notes";

export const getSubjects = async (university, semester) => {
  const res = await fetch(`${BASE_URL}/${university}/${semester}`);
  return res.json();
};

export const getFiles = async (university, semester, subject) => {
  const res = await fetch(`${BASE_URL}/${university}/${semester}/${subject}`);
  return res.json();
};
