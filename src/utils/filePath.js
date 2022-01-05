import config from "../config.json";

const filesBaseURL = config.api.filesBaseURL;

export const getFilePath = (path) => {
  path = path?.replaceAll("\\", "/");
  return `${filesBaseURL}/${path}`;
};

export const getFileName = (path) => {
  const filePath = getFilePath(path);
  return filePath.replace(config.api.filesBaseURL + "/uploads/files/", "");
};
