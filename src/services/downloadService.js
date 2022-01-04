import axios from "axios";
import jsFileDownloader from "js-file-download";
import config from "../config.json";

export const downloadFile = async (path, filename) => {
  const { data } = await axios.get(
    `${config.api.baseURL}/modules/download?path=${path}`
  );

  jsFileDownloader(data, filename);
};
