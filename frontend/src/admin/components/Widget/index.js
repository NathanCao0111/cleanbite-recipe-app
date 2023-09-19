import styles from './Widget.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightDots } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBill1, faUser, faStar } from '@fortawesome/free-regular-svg-icons';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

function Widget({ type }) {
  let data;
  switch (type) {
    case 'sales':
      data = {
        icon: <FontAwesomeIcon icon={faMoneyBill1} />,
        title: 'Total sales',
        isMoney: true,
        isDefault: true,
        isNegative: false,
        amount: '82,549.17',
        diff: 20.9,
        num: '18.4K',
      };
      break;
    case 'users':
      data = {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Users',
        isMoney: false,
        isDefault: false,
        isNegative: false,
        amount: 78,
        diff: 13,
        num: '3.5K',
      };
      break;
    case 'orders':
      data = {
        icon: <FontAwesomeIcon icon={faStar} />,
        title: 'Total orders',
        isMoney: false,
        isDefault: false,
        isNegative: false,
        amount: 262,
        diff: 4.2,
        num: '5K',
      };
      break;
    case 'refunded':
      data = {
        icon: <FontAwesomeIcon icon={faRotateLeft} />,
        title: 'Refunded',
        isMoney: false,
        isDefault: false,
        isNegative: true,
        amount: 18,
        diff: 9.1,
        num: 6,
      };
      break;
    default:
      break;
  }

  return (
    <section className={clsx(styles.widget, data.isDefault && styles.default)}>
      <div className={styles.top}>
        <span>{data.icon}</span>
        <p>{data.title}</p>
      </div>
      <div className={styles.center}>
        <h3>
          {data.isMoney && '$'}
          {data.amount}
        </h3>
      </div>
      <div className={styles.bottom}>
        <div className={clsx(styles.bottomLeft, data.isNegative ? styles.negative : styles.positive)}>
          <span>
            <FontAwesomeIcon icon={faArrowUpRightDots} />
          </span>
          <p>{data.diff}%</p>
        </div>
        <div className={styles.bottomRight}>
          <p>+{data.num} this week</p>
        </div>
      </div>
    </section>
  );
}

export default Widget;
