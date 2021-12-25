export const setEnrollment = (enrollment) => {
  const stringifiedEnrollment = JSON.stringify(enrollment);
  localStorage.setItem("enrollment", stringifiedEnrollment);
};

export const getcurrentEnrollment = () => {
  const enrollment = localStorage.getItem("enrollment");

  return JSON.parse(enrollment);
};

export const clearEnrollment = () => {
  localStorage.removeItem("enrollment");
};
