import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Navbar from "../../components/Navbar/Navbar";
import { rest } from "msw";
import { setupServer } from "msw/node";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "styled-components";
import i18n from "../../i18n";
import { darkTheme, lightTheme } from "../../utils/Theme";

describe("Test for comments component", () => {
  let darkMode = true;
  const mockStore = configureMockStore()({
    user: {
      currentUser: {
        _id: "62deef2f858a385e940848cb",
        name: "test1",
        email: "test1@gmail.com",
        password:
          "$2a$10$wc.THVT40S.4H3ykgte/Ce4HnWoUYS91aBM/fcicBnEwlUqQZONQK",
        subscribers: -1,
        subscribedUser: [
          "62def184fb86363613c71ac1",
          "62deef2f858a385e940848cb",
        ],
        img: "https://lh3.googleusercontent.com/a/AItbvmnyjPkzx_jX1ZqpgilOYfgfxIh6HE...",
        fromGoogle: false,
        createdAt: "2022-07-25T19:29:51.337Z",
        updatedAt: "2022-07-28T10:56:48.610Z",
        __v: 0,
      },
    },
  });

  const server = setupServer(
    rest.post("/auth/signout", (req, res, ctx) => {
      return res(ctx.status(200));
    })
  );

  const changeTheme = jest.fn((darkMode = false));

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Render navbar component successfully", async () => {
    await render(
      <Provider store={mockStore}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <BrowserRouter>
              <Navbar setDarkMode={changeTheme} />
            </BrowserRouter>
          </ThemeProvider>
        </I18nextProvider>
      </Provider>
    );
    // when enter logout
    fireEvent.click(screen.getByText(/Logout/i));
    await waitFor(() => {
      expect(global.window.location.href).toContain("/signin");
    });

    // when handle search video
    fireEvent.change(screen.getByTestId(/input-icon/i), {
      target: { value: "nhachay" },
    });
    fireEvent.click(screen.getByTestId(/search-icon/i));
    await waitFor(() => {
      expect(global.window.location.href).toContain("/search?q=nhachay");
    });

    // when handle change language
    fireEvent.change(screen.getByTestId(/language-switcher/i));
    await waitFor(() => {
      i18n.changeLanguage("en");
      expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    });

    // when handle change language
    fireEvent.change(screen.getByTestId(/theme-switcher/i), {
      target: { value: false },
    });
    await waitFor(() => {
      changeTheme();
      expect(screen.getByTestId(/nav-container/i)).toHaveStyle(
        "background-color: white"
      );
    });
  });
});
