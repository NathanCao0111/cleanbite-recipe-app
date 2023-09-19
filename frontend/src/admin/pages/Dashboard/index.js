import styles from './Dashboard.module.scss';
import Widget from '../../components/Widget';
import Progress from '../../components/Progress';
import Chart from '../../components/Chart';
import BasicTable from '../../components/BasicTable';

function Dashboard() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.widgets}>
          <Widget type="sales" />
          <Widget type="users" />
          <Widget type="orders" />
          <Widget type="refunded" />
        </div>
        <div className={styles.charts}>
          <Progress />
          <Chart />
        </div>
        <div className={styles.listContainer}>
          <h3>Top products</h3>
          <BasicTable />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
