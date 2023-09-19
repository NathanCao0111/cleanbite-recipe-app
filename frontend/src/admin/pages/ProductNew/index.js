import styles from './ProductNew.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

function ProductNew({ inputs, title }) {
  const [file, setFile] = useState('');
  const [successfulNotify, setSuccessfulNotify] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: 0,
    texture: '',
    weight: '',
    size: '',
    category: 0,
  });

  const handleUpdateData = async () => {
    setNewProduct({
      title: '',
      description: '',
      price: 0,
      texture: '',
      weight: '',
      size: '',
      category: 0,
    });

    await fetch('https://6448a5c1e7eb3378ca32d196.mockapi.io/api/clean-ecommerce/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newProduct.title,
        description: newProduct.description,
        price: newProduct.price,
        image: {
          bigImg: 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg',
          smallImgs: {
            smallImg1: 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg',
            smallImg2: 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg',
            smallImg3: 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg',
          },
        },
        specs: {
          texture: newProduct.texture,
          weight: newProduct.weight,
          size: newProduct.size,
        },
        category: newProduct.category,
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
          Create new product successfully &nbsp;
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
                const handleNewProduct = (e) => {
                  if (element.type !== 'number') {
                    setNewProduct((prev) => {
                      return {
                        ...prev,
                        [element.label]: e.target.value,
                      };
                    });
                  } else {
                    setNewProduct((prev) => {
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
                      value={newProduct[element.label]}
                      placeholder={element.placeholder}
                      onChange={handleNewProduct}
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

export default ProductNew;
