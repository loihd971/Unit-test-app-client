import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "../App";
import { store } from "../redux/store";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { useTranslation } from 'react-i18next';

describe("Testing App Component", () => {
  jest.mock("react-i18next", () => ({
    useTranslation: () => ({
      t: (key) => key,
      i18n: { changeLanguage: jest.fn() },
    }),
  }));
  test("renders learn react link", () => {
    const mockUseTranslation = jest.fn();
    const { t, i18n } = useTranslation();
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App t={t} />
        </I18nextProvider>
      </Provider>
    );

    expect(screen.getByText('json.field.in.translation')).toBeDefined();
  });
});
