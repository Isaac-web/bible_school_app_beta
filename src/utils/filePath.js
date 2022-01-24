import config from "../config.json";

const baseUrl =
  "https://bibleschool-backend-lbpvo.ondigitalocean.app/api" ||
  process.env.REACT_APP_BASE_URL ||
  config.api.baseURL;
const filesBaseURL = baseUrl.replace("/api", "");

export const getFilePath = (path) => {
  path = path?.replaceAll("\\", "/");
  return `${filesBaseURL}/${path}`;
};

export const getFileName = (path) => {
  const filePath = getFilePath(path);
  return filePath.replace(config.api.filesBaseURL + "/uploads/files/", "");
};
