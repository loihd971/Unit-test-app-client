import React from "react";
import LogoImage from "../../assets/images/logo.png";
import {
  Home,
  Explore,
  Subscriptions,
  History,
  LibraryMusic,
  SportsBasketball,
  MovieCreation,
  Article,
  LiveTv,
  Settings,
  Flag,
  DarkMode,
  LightMode,
  Report,
  AccountCircleOutlined,
  GamesOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import {Container, Wrapper, Logo, Item, Hr, Title, Login ,Img} from './MenuStyled'

const Menu = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={LogoImage} />
            VidShare
          </Logo>
        </Link>
        <Item>
          <Home />
          {t("menu.home")}
        </Item>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <Explore />
            {t("menu.explore")}
          </Item>
        </Link>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <Subscriptions />
            {t("menu.subscriptions")}
          </Item>
        </Link>
        <Hr />

        <Item>
          <LibraryMusic />
          {t("menu.library")}
        </Item>

        <Item>
          <History />
          {t("menu.history")}
        </Item>
        <Hr />
        {!currentUser && (
          <>
            <Login>
              {t("menu.remind-login")}
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button color="gradient">
                  <AccountCircleOutlined />
                  {t("menu.signin")}
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        <Title> {t("menu.categories")}</Title>
        <Link
          to="categories/music"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <LibraryMusic />
            {t("menu.music")}
          </Item>
        </Link>
        <Item>
          <SportsBasketball />
          {t("menu.sport")}
        </Item>
        <Item>
          <GamesOutlined />
          {t("menu.gaming")}
        </Item>
        <Item>
          <MovieCreation />
          {t("menu.movies")}
        </Item>
        <Item>
          <Article />
          {t("menu.help")}
        </Item>
        <Item>
          <LiveTv />
          {t("menu.live")}
        </Item>
        <Hr />
        <Item>
          <Settings />
          {t("menu.settings")}
        </Item>
        <Item>
          <Report />
          {t("menu.report")}
        </Item>
        <Item>
          <Flag />
          {t("menu.help")}
        </Item>
      </Wrapper>
    </Container>
  );
};
export default Menu;
