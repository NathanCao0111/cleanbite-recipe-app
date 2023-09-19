import styles from './UserSinglePage.module.scss';
import Progress from '../../components/Progress';
import BasicTable from '../../components/BasicTable';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../../context/useProducts';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import clsx from 'clsx';

function UserSinglePage({ inputs, title }) {
  const params = useParams();
  const userId = params.adminUserId;
  const singlePageData = useProducts();
  const [users] = singlePageData.usersContext;
  const [user, setUser] = useState(users[userId - 1]);
  const [open, setOpen] = useState(false);
  const [userTextField, setUserTextField] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
    age: user.age,
    phone: user.phone,
    country: user.country,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateData = async () => {
    setUser((prev) => {
      return {
        ...prev,
        ...userTextField,
      };
    });

    await fetch(`https://6448a5c1e7eb3378ca32d196.mockapi.io/api/clean-ecommerce/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userTextField),
    });

    setOpen(false);
  };

  useEffect(() => {
    if (userId) {
      fetch(`https://6448a5c1e7eb3378ca32d196.mockapi.io/api/clean-ecommerce/users/${userId}`)
        .then((response) => response.json())
        .then((data) => setUser(data));
    }
  }, [userId]);

  return (
    <section className={styles.single}>
      <Dialog open={open} onClose={handleClose} className={styles.dialog}>
        <DialogTitle className={styles.dialogTitle}>{title}</DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <DialogContentText className={styles.dialogContentText}>
            To {title} data, please enter your inputs here.
          </DialogContentText>
          {inputs.map((element) => {
            const handleTextField = (e) => {
              if (element.type !== 'number') {
                setUserTextField((prev) => {
                  return {
                    ...prev,
                    [element.label]: e.target.value,
                  };
                });
              } else {
                setUserTextField((prev) => {
                  return {
                    ...prev,
                    [element.label]: Number(e.target.value),
                  };
                });
              }
            };

            return (
              <TextField
                key={element.id}
                autoFocus
                margin="normal"
                id={element.label}
                label={element.label}
                type={element.type}
                fullWidth
                variant="standard"
                value={userTextField[element.label]}
                onChange={handleTextField}
              />
            );
          })}
        </DialogContent>
        <DialogActions className={styles.dialogActions}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateData} className={styles.update}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.left}>
            <button onClick={handleClickOpen}>Update</button>
            <h3>Information</h3>
            <div className={styles.item}>
              <img src={user.img} alt="information ava" />
              <div className={styles.details}>
                <p>{user.name}</p>
                <div className={styles.detail}>
                  <span className={styles.detailKey}>Email:</span>
                  <span className={styles.detailValue}>{user.email}</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.detailKey}>Status:</span>
                  <span className={clsx(styles.detailValue, styles.status)}>{user.status}</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.detailKey}>Country:</span>
                  <span className={styles.detailValue}>{user.country}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <Progress />
          </div>
        </div>
        <div className={styles.bottom}>
          <h3>Latest transactions</h3>
          <BasicTable />
        </div>
      </div>
    </section>
  );
}

export default UserSinglePage;
