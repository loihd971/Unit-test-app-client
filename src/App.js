import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu/Menu";
import Navbar from "./components/Navbar/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Video from "./pages/Video/Video";
import SignIn from "./pages/Signin/SignIn";
import Search from "./pages/Search/Search";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container className="social-app">
        <BrowserRouter>
          <Menu />
          <Main>
            <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random-videos" />} />
                  <Route path="trends" element={<Home type="trend-videos" />} />
                  <Route
                    path="subscriptions"
                    element={<Home type="sub-videos" />}
                  />
                  <Route
                    path="categories/music"
                    element={<Home type="tags?tags=music" />}
                  />
                  <Route path="search" element={<Search />} />
                  <Route
                    path="signin"
                    element={currentUser ? <Home /> : <SignIn />}
                  />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                  <Route path="*" element={<>Page Not found</>}></Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
