import styles from './UserNew.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

function UserNew({ inputs, title }) {
  const [file, setFile] = useState('');
  const [successfulNotify, setSuccessfulNotify] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    age: 0,
    phone: '',
    country: '',
  });

  const handleUpdateData = async () => {
    setNewUser({
      name: '',
      email: '',
      password: '',
      age: 0,
      phone: '',
      country: '',
    });

    await fetch('https://6448a5c1e7eb3378ca32d196.mockapi.io/api/clean-ecommerce/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newUser,
        img: 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg',
        status: 'active',
      }),
    });

    setSuccessfulNotify(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessfulNotify(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [successfulNotify]);

  return (
    <section className={styles.new}>
      <div className={clsx(styles.notify, successfulNotify === true ? styles.slideIn : '')}>
        <p>
          Create new user successfully &nbsp;
          <span>
            <FontAwesomeIcon icon={faCheckSquare} />
          </span>
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.top}>
          <h3>{title}</h3>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <img
              src={
                file ? URL.createObjectURL(file) : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt="avatar"
            />
          </div>
          <div className={styles.right}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className={styles.input}>
                <label htmlFor="file">
                  <div className={styles.imgFile}>Image</div>
                  <div className={styles.icon}>
                    <FontAwesomeIcon icon={faFileImage} />
                    {file ? <span>Choose another file</span> : <span>No file chosen</span>}
                  </div>
                </label>
                <input type="file" id="file" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
              </div>
              {inputs.map((element) => {
                const handleNewUser = (e) => {
                  if (element.type !== 'number') {
                    setNewUser((prev) => {
                      return {
                        ...prev,
                        [element.label]: e.target.value,
                      };
                    });
                  } else {
                    setNewUser((prev) => {
                      return {
                        ...prev,
                        [element.label]: Number(e.target.value),
                      };
                    });
                  }
                };

                return (
                  <div key={element.id} className={styles.input}>
                    <label>{element.label}</label>
                    <input
                      type={element.type}
                      value={newUser[element.label]}
                      placeholder={element.placeholder}
                      onChange={handleNewUser}
                    />
                  </div>
                );
              })}
              <button type="submit" onClick={handleUpdateData}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserNew;
