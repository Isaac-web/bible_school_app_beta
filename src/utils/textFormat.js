export const abbreviate = (str, length) => {
  const stringLength = length || 40;
  return str.length < stringLength ? str : `${str.substr(0, stringLength)}...`;
};
