import Axios from 'axios';

const backendUrl = '/files';
const csrfToken = document
  .querySelector('meta[name="csrfToken"]')
  ?.getAttribute('content');

export const getFiles = () => ({
  type: 'GET_FILES',
  payload: Axios.get(backendUrl),
});

export const uploadFile = (file) => {
  const data = new FormData();
  data.append('file', file);
  const headers = {
    'csrf-token': csrfToken,
    'Content-Type': 'multipart/form-data',
  };

  return {
    type: 'UPLOAD_FILE',
    payload: Axios.post(backendUrl, data, { headers }),
  };
};

export const deleteFile = (id: string) => {
  const headers = { 'csrf-token': csrfToken };
  return {
    type: 'DELETE_FILE',
    payload: Axios.delete(`${backendUrl}/${id}`, { headers }),
  };
};
