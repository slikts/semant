import React from "react";
import styles from "./LineEdit.module.scss";
import listItemStyles from "./tokens/ListItem.module.scss";
import { useCallbackContext } from "../state";
import clsx from "clsx";

const itemSel = `.${listItemStyles.ListItem}`;
const findSibling = (el, dir) => {
  if (!el) {
    return;
  }
  const item = el.closest(itemSel);
  const sibling = item[`${dir}Sibling`];
  if (!sibling) {
    return item.parentNode.closest(itemSel);
  }
  return sibling;
};
const focusSibling = (el, dir) => {
  const target = findSibling(el, dir);
  if (!target) {
    return;
  }
  target.querySelector(`.${styles.textarea}`).focus();
};
const keyHandlers = {
  ArrowUp(_, el) {
    focusSibling(el, "previous");
  },
  ArrowDown(_, el) {
    focusSibling(el, "next");
  },
  Tab({ shiftKey }, _, { indent, deindent }, path) {
    if (shiftKey) {
      deindent(path);
    } else {
      indent(path);
    }
  },
  Enter({ shiftKey }, el) {
    if (shiftKey) {
      return true;
    }
  }
};

const LineEdit = ({ path: rawPath, type, ast }) => {
  const path = rawPath.split(".");
  const callbacks = useCallbackContext();
  const ref = React.createRef();

  const handleChange = ({ target: { value } }) => {
    callbacks.setValue(path, value);
  };
  const handleKeyDown = event => {
    const { key } = event;

    if (keyHandlers[key]) {
      const unhandled = keyHandlers[key](event, ref.current, callbacks, path);
      if (!unhandled) {
        event.preventDefault();
      }
    }
  };

  return (
    <div className={clsx(styles[type], styles.LineEdit)}>
      <textarea
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={styles.textarea}
        rows={ast.value.split("\n").length}
        value={ast.value}
        ref={ref}
      />
    </div>
  );
};

export default React.memo(LineEdit);
