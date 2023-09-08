import styles from "../../scss/components/DefaultLayout/DefaultLayout.module.scss";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

function DefaultLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
