import { saveAs } from "file-saver";

export const downloadFile = async (path, filename) => {
  saveAs(path, filename);
};
