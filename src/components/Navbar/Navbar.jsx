import React, { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Upload from "../Upload/Upload";
import { logout } from "../../redux/userSlice";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { DarkMode, LightMode } from "@mui/icons-material";
import { Row, Col, Switch, Button, Input } from "antd";
import { NavbarContainer, User, Avatar } from "./NavbarStyled";

const Navbar = ({ darkMode, setDarkMode }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = () => {
    axios.post("/auth/signout");
    dispatch(logout());
  };
  return (
    <NavbarContainer>
      <Row gap={1} className="nav-wrapper">
        <Col className="nav-left">
          <Input
            className="input-video__search"
            allowClear
            placeholder={t("menu.search")}
            onChange={(e) => setQ(e.target.value)}
            suffix={
              <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} />
            }
          />
        </Col>
        <Col className="nav-right">
          <VideoCallOutlinedIcon onClick={() => setIsModalVisible(true)} />

          <Switch
            defaultChecked
            color="success"
            onChange={(checked) => {
              i18n.changeLanguage(checked ? "en" : "vi");
            }}
          />
          <Switch
            defaultChecked
            color="success"
            onChange={(checked) => {
              setDarkMode(checked);
            }}
          />

          {currentUser ? (
            <>
              <User>
                <Avatar src={currentUser.img} />
                {currentUser.name}
              </User>
              <User onClick={() => handleLogout()}>/ Logout</User>
            </>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button className="btn-login">
                <AccountCircleOutlinedIcon />
                {t("menu.signin")}
              </Button>
            </Link>
          )}
        </Col>
      </Row>

      <Upload
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </NavbarContainer>
  );
};

export default Navbar;
