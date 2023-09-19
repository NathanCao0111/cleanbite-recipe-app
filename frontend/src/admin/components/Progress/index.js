import styles from './Progress.module.scss';
import clsx from 'clsx';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Progress() {
  const data = [
    {
      month: 'Jan',
      orders: 4000,
      revenue: 2400,
      amt: 2400,
    },
    {
      month: 'Feb',
      orders: 3000,
      revenue: 1398,
      amt: 2210,
    },
    {
      month: 'Mar',
      orders: 2000,
      revenue: 9800,
      amt: 2290,
    },
    {
      month: 'Apr',
      orders: 2780,
      revenue: 3908,
      amt: 2000,
    },
    {
      month: 'May',
      orders: 1890,
      revenue: 4800,
      amt: 2181,
    },
    {
      month: 'Jun',
      orders: 2390,
      revenue: 3800,
      amt: 2500,
    },
    {
      month: 'Jul',
      orders: 3490,
      revenue: 4300,
      amt: 2100,
    },
    {
      month: 'Aug',
      orders: 3672,
      revenue: 3758,
      amt: 2500,
    },
    {
      month: 'Sep',
      orders: 4905,
      revenue: 5463,
      amt: 2100,
    },
    {
      month: 'Oct',
      orders: 3834,
      revenue: 4742,
      amt: 2200,
    },
    {
      month: 'Nov',
      orders: 3998,
      revenue: 4131,
      amt: 2800,
    },
    {
      month: 'Dec',
      orders: 2923,
      revenue: 4525,
      amt: 2200,
    },
  ];

  return (
    <section className={styles.progress}>
      <div className={styles.upper}>
        <h3>Revenue vs Orders</h3>
        <div className={styles.categories}>
          <div className={styles.category}>
            <span className={clsx(styles.dot, styles.blue)}></span>
            <p>Revenue</p>
          </div>
          <div className={styles.category}>
            <span className={clsx(styles.dot, styles.red)}></span>
            <p>Orders</p>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 30,
            right: 20,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className={styles.grid} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#3e98c7" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="orders" stroke="#b6002c" />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}

export default Progress;
