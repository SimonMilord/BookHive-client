import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        margin: 0,
        padding: 0,
      },
      // colors: {
      //   primary: '#333333',
      //   secondary: '#FDB813',
      //   font: '#FFFFFF',
      // },
    },
  },
});

export default theme;