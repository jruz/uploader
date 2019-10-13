import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Form from './form';
import Files from './files';
import { getFiles } from './actions';

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFiles());
  }, []);

  return (
    <section className="container">
      <Form />
      <Files />
    </section>
  );
};

export default App;
