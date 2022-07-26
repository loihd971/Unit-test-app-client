import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "../App";
import { store } from "../redux/store";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
