import { Route, Routes } from "react-router-dom";
import './App.scss';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './styles/_variables.scss';

export default function App() {
  const theme: Object = extendTheme({
    colors: {
      primary: '#333333',
      secondary: '#FDB813',
    },
  })
    return (
      <>
        <ChakraProvider theme={theme}>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="*" element={<NotFoundPage />}/>
          </Routes>
        </ChakraProvider>
      </>
    )
}
