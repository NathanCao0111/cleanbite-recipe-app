import styles from "../../../scss/components/layout/Footer.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className={clsx(styles.wrapper, "pt-3 pt-md-5 mt-5")}>
      <div className="container">
        <div className="row pt-4 pb-0 pb-md-5">
          <div className="col-md-6">
            <div className="pr-0 pr-lg-5 mr-0 mr-md-5">
              <Link to="/">
                <h3>Cleanbite</h3>
              </Link>
              <p
                className={clsx(
                  styles.quote,
                  "mt-3 text-gray-300 pr-0 pr-lg-5 mr-0 mr-lg-4"
                )}
              >
                "On the other hand, we denounce with righteous indignation and
                dislike men who are so beguiled and demoralized by the charms of
                pleasure of the moment"
              </p>
            </div>
          </div>
          <div className="col-md-2">
            <h6 className="caption font-weight-medium mb-2">Cleanbite</h6>
            <ul>
              <li>
                <Link to="">About us</Link>
              </li>
              <li>
                <Link to="">Careers</Link>
              </li>
              <li>
                <Link to="">Contact us</Link>
              </li>
              <li>
                <Link to="">Feedbacks</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-2">
            <h6 className="caption font-weight-medium mb-2">Legal</h6>
            <ul>
              <li>
                <Link to="">Terms</Link>
              </li>
              <li>
                <Link to="">Conditions</Link>
              </li>
              <li>
                <Link to="">Cookies</Link>
              </li>
              <li>
                <Link to="">Copyrights</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-2">
            <h6 className="caption font-weight-medium mb-2">Follow</h6>
            <ul>
              <li>
                <Link to="">Facebook</Link>
              </li>
              <li>
                <Link to="">Instagram</Link>
              </li>
              <li>
                <Link to="">Youtube</Link>
              </li>
              <li>
                <Link to="">Tiktok</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <hr></hr>
        <div className="row pb-4 pt-2 align-items-center">
          <div className="col-md-12 order-2 order-md-0">
            <p
              className={clsx(
                styles.copyright,
                "text-gray-300 small text-left mb-0"
              )}
            >
              Design by{" "}
              <a
                href="https://fabrx.co/preview/tastebite/index.html"
                target="_blank"
              >
                Tastebite
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
