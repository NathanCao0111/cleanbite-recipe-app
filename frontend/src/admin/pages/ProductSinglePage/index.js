import styles from './ProductSinglePage.module.scss';
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

function ProductSinglePage({ inputs, title }) {
  const params = useParams();
  const productId = params.adminProductId;
  const singlePageData = useProducts();
  const [products] = singlePageData.productsContext;
  const [product, setProduct] = useState(products[productId - 1]);
  const [open, setOpen] = useState(false);
  const [productTextField, setProductTextField] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    texture: product.specs.texture,
    weight: product.specs.weight,
    size: product.specs.size,
    category: product.category,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateData = () => {
    setProduct((prev) => {
      return {
        ...prev,
        title: productTextField.title,
        description: productTextField.description,
        price: productTextField.price,
        specs: {
          texture: productTextField.texture,
          weight: productTextField.weight,
          size: productTextField.size,
        },
        category: productTextField.category,
      };
    });

    setOpen(false);
  };

  useEffect(() => {
    fetch(`https://6448a5c1e7eb3378ca32d196.mockapi.io/api/clean-ecommerce/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
  }, [product, productId]);

  useEffect(() => {
    if (productId) {
      fetch(`https://6448a5c1e7eb3378ca32d196.mockapi.io/api/clean-ecommerce/products/${productId}`)
        .then((response) => response.json())
        .then((data) => setProduct(data));
    }
  }, [productId]);

  return (
    <section className={styles.single}>
      <Dialog open={open} onClose={handleClose} className={styles.dialog}>
        <DialogTitle className={styles.dialogTitle}>{title}</DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <DialogContentText className={styles.dialogContentText}>
            To {title} data, please enter your inputs here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="title"
            label="title"
            type="text"
            fullWidth
            variant="standard"
            value={productTextField.title}
            onChange={(e) => setProductTextField((prev) => ({ ...prev, title: e.target.value }))}
          />
          <TextField
            autoFocus
            margin="normal"
            id="description"
            label="description"
            type="text"
            fullWidth
            variant="standard"
            value={productTextField.description}
            onChange={(e) => setProductTextField((prev) => ({ ...prev, description: e.target.value }))}
          />
          <TextField
            autoFocus
            margin="normal"
            id="price"
            label="price"
            type="number"
            fullWidth
            variant="standard"
            value={productTextField.price}
            onChange={(e) => setProductTextField((prev) => ({ ...prev, price: Number(e.target.value) }))}
          />
          <TextField
            autoFocus
            margin="normal"
            id="texture"
            label="texture"
            type="text"
            fullWidth
            variant="standard"
            value={productTextField.texture}
            onChange={(e) => setProductTextField((prev) => ({ ...prev, texture: e.target.value }))}
          />
          <TextField
            autoFocus
            margin="normal"
            id="weight"
            label="weight"
            type="text"
            fullWidth
            variant="standard"
            value={productTextField.weight}
            onChange={(e) => setProductTextField((prev) => ({ ...prev, weight: e.target.value }))}
          />
          <TextField
            autoFocus
            margin="normal"
            id="size"
            label="size"
            type="text"
            fullWidth
            variant="standard"
            value={productTextField.size}
            onChange={(e) => setProductTextField((prev) => ({ ...prev, size: e.target.value }))}
          />
          <TextField
            autoFocus
            margin="normal"
            id="category"
            label="category"
            type="number"
            fullWidth
            variant="standard"
            value={productTextField.category}
            onChange={(e) => setProductTextField((prev) => ({ ...prev, category: Number(e.target.value) }))}
          />
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
              <img src={product.image.bigImg} alt="information ava" />
              <div className={styles.details}>
                <p>{product.title}</p>
                <div className={styles.detail}>
                  <span className={styles.detailKey}>Texture:</span>
                  <span className={styles.detailValue}>{product.specs.texture}</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.detailKey}>Weight:</span>
                  <span className={clsx(styles.detailValue, styles.status)}>{product.specs.weight}</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.detailKey}>Size:</span>
                  <span className={styles.detailValue}>{product.specs.size}</span>
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

export default ProductSinglePage;
