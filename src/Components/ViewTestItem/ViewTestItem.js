import React from "react";

import styles from "./ViewTestItem.module.css";
import { Link } from "react-router-dom";

const ViewTestItem = ({ item }) => {
  const date = new Date(item.createDate);

  return (
    <Link to={"./"+item._id} className={styles.linkStyle}>
      <div className={styles.container}>
        <div className={styles.leftSelection}>
          <div className={styles.nameContainer}>{item.testName}</div>
          <div className={styles.timeContainer}>
            {date.toLocaleDateString()}
          </div>
        </div>
        <div className={styles.rightSelection}>
          <div className={styles.statusContainer}>
            Durum:{" "}
            <span style={item.isClosed ? { color: "red" } : { color: "green" }}>
              {item.isClosed ? "Kapalı" : "Açık"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ViewTestItem;
