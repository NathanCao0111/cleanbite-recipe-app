import styles from './BasicTable.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function BasicTable() {
  const createData = (name, img, orderId, price, sold, sales) => {
    return { name, img, orderId, price, sold, sales };
  };

  const rows = [
    createData(
      'Little Armchair Sheepskin',
      'https://minimalist-e-commerce.vercel.app/static/media/1.122c04e77ef5da9e8406.jpg',
      '#08251',
      '$986',
      24,
      '$23,664',
    ),
    createData(
      'Pulp Unit - 5 Compartments',
      'https://img.muji.net/img/item/4945247549201_1260.jpg',
      '#09503',
      '$254',
      67,
      '$17,018',
    ),
    createData(
      'Lamp Light Blue',
      'https://minimalist-e-commerce.vercel.app/static/media/3.4c8f91797d8ef5e0206c.png',
      '#07897',
      '$79',
      124,
      '$9,796',
    ),
    createData(
      'Golden Modern Light',
      'https://minimalist-e-commerce.vercel.app/static/media/5.e2e1c208d1932b2c0db0.jpg',
      '#09093',
      '$189',
      49,
      '$9,261',
    ),
    createData(
      'Pop-Up Toaster',
      'https://minimalist-e-commerce.vercel.app/static/media/2.f312c91f99a2c3a60550.jpg',
      '#0405',
      '$45',
      137,
      '$6,165',
    ),
  ];

  return (
    <TableContainer component={Paper} className={styles.table} sx={{ border: 0, boxShadow: 0 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableHeader}>Product name</TableCell>
            <TableCell className={styles.tableHeader}>Order ID</TableCell>
            <TableCell className={styles.tableHeader}>Price</TableCell>
            <TableCell className={styles.tableHeader}>Sold</TableCell>
            <TableCell className={styles.tableHeader}>Sales</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell className={styles.tableCell}>
                <div className={styles.cell}>
                  <img src={row.img} alt={row.name} />
                  {row.name}
                </div>
              </TableCell>
              <TableCell className={styles.tableCell}>{row.orderId}</TableCell>
              <TableCell className={styles.tableCell}>{row.price}</TableCell>
              <TableCell className={styles.tableCell}>{row.sold}</TableCell>
              <TableCell className={styles.tableCell}>{row.sales}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable;
