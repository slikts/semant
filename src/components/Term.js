import React from "react";
import LineEdit from "./LineEdit";

const Term = ({ ast, path }) => {
  return (
    <div>
      <LineEdit path={path} type="term" ast={ast.children[0]} />
    </div>
  );
};

export default React.memo(Term);
