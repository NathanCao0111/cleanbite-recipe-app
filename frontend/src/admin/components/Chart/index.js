import styles from './Chart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';

function Chart() {
  return (
    <section className={styles.chart}>
      <Link to="">
        <div className={styles.top}>
          <h3>Sales by category</h3>
        </div>
        <div className={styles.center}>
          <CircularProgressbar value={85} text={'85%'} strokeWidth={5} />
        </div>
        <div className={styles.bottom}>
          <div className={styles.categories}>
            <div className={styles.category}>
              <span className={styles.dot}></span>
              <p>Furnitures</p>
            </div>
            <div className={styles.category}>
              <span className={styles.dot}></span>
              <p>Electronics</p>
            </div>
            <div className={styles.category}>
              <span className={styles.dot}></span>
              <p>Lamps</p>
            </div>
          </div>
          <div className={styles.more}>
            <p>More</p>
            <span>
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}

export default Chart;
