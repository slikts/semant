import React from "react";
import ListItem from "./ListItem";
import styles from "./List.module.scss";

const List = ({ ast: { type, children }, path = "0" }) => {
  return (
    <div className={styles.List}>
      {children.map((item, i) => {
        return <ListItem path={`${path}.${i}`} ast={item} key={i} />;
      })}
    </div>
  );
};

export default React.memo(List);
