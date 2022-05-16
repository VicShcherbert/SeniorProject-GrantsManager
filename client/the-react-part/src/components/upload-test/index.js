import { React, useState, useEffect } from 'react';
import { Segment } from 'semantic-ui-react';

export const UploadTest = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('');
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onFileUpload = async (e) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    console.log(formData);
    // try {
    //   const res = await axios.post(
    //     "http://localhost:3000/upload",
    //     formData
    //   );
    //   console.log(res);
    // } catch (ex) {
    //   console.log(ex);
    // }
  };
  return (
    <Segment>
      <input type='file' onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload!</button>
    </Segment>
  );
};
