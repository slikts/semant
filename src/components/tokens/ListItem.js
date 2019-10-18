import React from "react";
import List from "./List";
import Term from "../Term";
import LineEdit from "../LineEdit";
import styles from "./ListItem.module.scss";

const ListItem = ({ ast: { type, children }, path = "" }) => {
  return (
    <div className={styles.ListItem}>
      {children.map((item, i) => {
        let result;
        const newPath = `${path}.${i}`;
        if (item.type === "list") {
          result = <List path={newPath} ast={item} />;
        } else if (item.type === "heading") {
          result = <Term path={newPath} ast={item} />;
        } else if (item.type === "paragraph") {
          result = (
            <LineEdit path={newPath} type={item.type} ast={item.children[0]} />
          );
        } else {
          result = item.type;
        }

        return <div key={i}>{result}</div>;
      })}
    </div>
  );
};

export default React.memo(ListItem);
