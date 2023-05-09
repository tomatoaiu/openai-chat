import { style } from "@vanilla-extract/css";

export const appStyle = {
  form: style({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  }),
  send: style({
    marginLeft: 4,
  }),
  input: style({
    padding: 4,
    width: "300px",
  }),
  ul: style({
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
  }),
  list: style({
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    selectors: {
      "&:not(:last-child)": {
        marginBottom: 8,
      },
    },
  }),
  user: style({
    alignSelf: "flex-end",
    alignItems: "flex-end",
  }),
  assistant: style({
    alignSelf: "flex-start",
  }),
  name: style({
  }),
  message: style({
    margin: 0,
    border: "1px solid #ccc",
    borderRadius: 12,
    padding: 12,
    maxWidth: "80%",
  }),
};
