import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from './actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const Form: React.FC = () => {
  const inputEl = useRef(null) as any;
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setEmpty] = useState(true);
  let buttonStyle = 'button is-primary';

  const onSubmit = async (e: any) => {
    e.preventDefault();
    e.persist();
    setLoading(true);

    const file = inputEl.current.files[0];
    try {
      await dispatch(uploadFile(file));
      e.target.reset();
    } catch (e) {
      buttonStyle += ' is-danger';
    }
    setLoading(false);
  };

  const onChange = (e) => {
    setEmpty(!e.target.files[0]);
  };

  if (isLoading) buttonStyle += ' is-loading';

  return (
    <section className="section">
      <h2 className="title is-2">
        <FontAwesomeIcon icon={faUpload} /> Upload
      </h2>
      <form onSubmit={onSubmit} action="" encType="multipart/form-data">
        <div className="field is-grouped">
          <div className="control is-expanded">
            <input
              onChange={onChange}
              className="input"
              type="file"
              ref={inputEl}
            />
          </div>
          <div className="control">
            <button className={buttonStyle} disabled={isLoading || isEmpty}>
              Upload
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Form;
