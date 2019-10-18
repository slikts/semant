import { createContext, useContext } from "react";
import { create } from "md-mdast";
import useMethods from "use-methods";

export const CallbackContext = createContext();

const parser = create();

const Page = ({ markdown }) => ({
  markdown,
  ast: parser.tokenizeBlock(markdown)
});

const initialState = {
  pages: [],
  currentPage: null,
  focusedPath: null
};

const getItem = (ast, path) => path.reduce((a, b) => a.children[b], ast);

// eslint-disable-next-line no-unused-vars
const d = x => JSON.parse(JSON.stringify(x));

const methods = {
  methods: draft => ({
    addPage(markdown) {
      const page = Page({
        markdown
      });
      draft.pages.push(page);
      draft.currentPage = draft.pages.length - 1;
    },
    deindent(path) {
      console.log(path);
    },
    indent(path) {
      console.log(path);
    },
    setValue(path, value) {
      const item = getItem(draft.pages[draft.currentPage].ast, path);
      item.children[0].value = value;
    }
  })
};

export const useAppState = () => useMethods(methods, initialState);

export const useCallbackContext = () => useContext(CallbackContext);
