import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArchive } from '@fortawesome/free-solid-svg-icons';
import prettyBytes from 'pretty-bytes';
import { deleteFile } from './actions';
import style from './files.scss';

const hasMatch = (name: string, value: string): boolean => {
  const lowerName = name.toLowerCase();
  const lowerValue = value.toLowerCase();
  return lowerName.indexOf(lowerValue) !== -1;
};

const Files: React.FC = () => {
  const store = useSelector((s) => s);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const inputEl = useRef(null) as any;

  useEffect(() => {
    setFiles(store);
  }, [store]);

  const onClick = (id: string) => {
    dispatch(deleteFile(id));
  };

  const onKeyUp = (e) => {
    const value = e.target.value;
    const result = store.filter(({ name }) => hasMatch(name, value));
    setFiles(result);
  };

  if (!files) return <p>Loading...</p>;

  const reducer = (t, f) => parseInt(f.size) + t;
  const totalSize = files.reduce(reducer, 0);
  const tag = (mimetype: string) => mimetype.split('/')[0];

  return (
    <section className="section">
      <h2 className="title is-2">
        <FontAwesomeIcon icon={faArchive} /> Files
      </h2>
      <div>
        <input
          className="input"
          type="text"
          onKeyUp={onKeyUp}
          ref={inputEl}
          placeholder="Search.."
        />
      </div>
      <table className="table is-hoverable is-fullwidth">
        <tbody>
          {files.map(({ name, mimetype, id, size, createdAt }) => (
            <tr key={id}>
              <td className={style.fileName}>
                <a href={`/files/${id}`}>{name}</a>
              </td>
              <td>
                <span className="tag is-hidden-mobile">{tag(mimetype)}</span>
              </td>
              <td className="is-hidden-mobile">{prettyBytes(size)}</td>
              <td className="is-hidden-mobile">
                {dayjs(createdAt).format('DD/MM/YYYY')}
              </td>
              <td onClick={() => onClick(id)} className={style.delete}>
                <FontAwesomeIcon icon={faTrash} />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>{files.length} files</td>
            <td colSpan={3}>{prettyBytes(totalSize)}</td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
};

export default Files;
