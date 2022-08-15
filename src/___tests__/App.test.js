import { Provider } from "react-redux";
import App from "../App";
import { render } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

describe("Test for card component", () => {
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

  test("Render card component successfully", () => {
    render(
      <Provider store={mockStore}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Provider>
    );
    expect(global.window.location.href).not.toContain("/signin");
  });
});
