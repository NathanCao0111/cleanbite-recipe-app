import styles from './UsersTable.module.scss';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function UsersTable() {
  const [usersData, setUsersData] = useState([]);

  const actionColumn = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => {
        const handleDeleteUser = async (id) => {
          const newUsersData = usersData.filter((element) => element.id !== id);
          setUsersData(newUsersData);

          await fetch(`https://6448a5c1e7eb3378ca32d196.mockapi.io/api/clean-ecommerce/users/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        };

        return (
          <div className={styles.cellActions}>
            <Link to={`/admin/user/${params.id}`}>
              <button className={styles.view}>Update</button>
            </Link>
            <button className={styles.delete} onClick={() => handleDeleteUser(params.id)}>
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'users',
      headerName: 'Users',
      width: 230,
      renderCell: (params) => {
        return (
          <div className={styles.cellImg}>
            <img src={params.row.img} alt={params.row.name} />
            <span>{params.row.name}</span>
          </div>
        );
      },
    },
    { field: 'email', headerName: 'Email', width: 230 },
    { field: 'age', headerName: 'Age', type: 'number', headerAlign: 'start', cellClassName: styles.cellAge, width: 90 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        return (
          <div
            className={clsx(
              styles.cellStatus,
              params.row.status === 'active' ? styles.active : '',
              params.row.status === 'inactive' ? styles.inactive : '',
              params.row.status === 'pending' ? styles.pending : '',
            )}
          >
            {params.row.status}
          </div>
        );
      },
    },
  ];

  const rows = usersData;

  useEffect(() => {
    fetch('https://6448a5c1e7eb3378ca32d196.mockapi.io/api/clean-ecommerce/users')
      .then((response) => response.json())
      .then((data) => setUsersData(data));
  }, []);

  return (
    <section className={styles.wrapper}>
      <Link to="/admin/user/new">
        <button className={styles.newBtn}>
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>
          Create New User
        </button>
      </Link>
      <div className={styles.dataTable} style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns.concat(actionColumn)}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          autoPageSize
          // pageSizeOptions={[5, 10]}
          checkboxSelection
          rowHeight={78}
          className={styles.dataGrid}
        />
      </div>
    </section>
  );
}

export default UsersTable;
