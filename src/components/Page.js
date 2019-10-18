import React from "react";
import List from "./tokens/List";

const Page = ({ ast }) => {
  return (
    <div>
      <List ast={ast.children[0]} />
    </div>
  );
};

export default React.memo(Page);
