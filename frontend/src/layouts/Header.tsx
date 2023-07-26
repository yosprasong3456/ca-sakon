import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { authSelector, logout } from "../store/slices/authSlice";
// import { useAppDispatch } from "../store/store";
import { useEffect } from "react";
// import SwitchMode from "../components/SwitchMode";
import {
  Badge,
  BadgeProps,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  styled,
} from "@mui/material";
// import { personHisSelector } from "../store/slices/personHisSlice";

// const pages = ["ผู้ป่วยมะเร็ง HIS", "ผู้ป่วยมะเร็ง API", "Blog"];
// const settings = ["Logout"];
const navButton = [
  { name: "👋🏽 ผู้ป่วยรายใหม่", router: "/home" },
  { name: "🏥 ผู้ป่วยส่งข้อมูลแล้ว", router: "/personCA" },
  // { name: "🔎 ค้นหาผู้ป่วย", router: "/search" },
];
function Header() {
//   const dispatch = useAppDispatch();
//   const authReducer = useSelector(authSelector);
//   const personHisReducer = useSelector(personHisSelector);

  const navigate = useNavigate();
  useEffect(() => {
    // console.log(authReducer.authData);
  }, []);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = async () => {
    // dispatch(logout());
    navigate("/login");
  };

  const changePage = (params: string) => {
      navigate(params);
  };

  return (
    <AppBar position="static">
      <Container
      //   maxWidth="xl"
      >
        <Drawer
          anchor="left"
          open={open}
          onClose={handleClose}
          sx={{ padding: 5 }}
        >
          <Box
            sx={{
              width: { xs: 100 },
              alignSelf: "center",
              marginTop: 2,
            }}
          >
            <img src="/udch.png" style={{ width: "100%"}} />
          </Box>
          <Stack spacing={1} padding={2}>
            {navButton.map((data: any, index: number) => {
              return (
                <Box
                  key={index}
                  boxShadow={5}
                  borderRadius={3}
                  onClick={() => changePage(data.router)}
                >
                  <ListItem sx={{m: 1}}>
                    {/* <ListItemAvatar>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    </ListItemAvatar> */}
                    <ListItemText primary={data.name} />
                  </ListItem>
                  {/* <Typography>ผู้ป่วยมะเร็งรายใหม่</Typography> */}
                </Box>
              );
            })}
                  <Divider />

            <Box
              boxShadow={5}
              // m={1}
              borderRadius={3}
              onClick={() => onLogout()}
            >
              <ListItem sx={{m: 1}}>
                <ListItemText primary="🚗 ออกจากระบบ" />
              </ListItem>
            </Box>
          </Stack>
        </Drawer>
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", sm: "none", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                width: { xs: 50, sm: 50, md: 80 },
                marginTop: 1,
              }}
            >
              <img src="/udch.png" style={{ width: "85%", backgroundColor:'white', borderRadius:'50%' }} />
            </Box>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex", md: "flex" },
              // width: { xs: 50, sm: 50, md: 80 },
            }}
          >
            <Box
              sx={{
                width: { xs: 50, sm: 50, md: 80 },
                // marginTop: 1,
              }}
            >
              <img
                src="/udch.png"
                onClick={() => navigate("/welcome")}
                style={{ cursor: "pointer", width: "85%", backgroundColor:'white', borderRadius:'50%' }}
              />
            </Box>

            {/* <Typography
              variant="h6"
              textAlign="center"
              sx={{ my: 3, color: "white" }}
            >
              UDCH X Cancer Anywhere
            </Typography> */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex", md: "flex" },
              }}
            >
              {navButton.map((data: any, index: number) => {
                return (
                  <MenuItem
                    key={index}
                    onClick={() => changePage(data.router)}
                  >
                     <Typography textAlign="center">{data.name}</Typography>
                  </MenuItem>
                );
              })}

            </Box>

            {/* {pages.map((page) => (
              
            ))} */}
          </Box>
          {/* <SwitchMode /> */}
          <Box sx={{ flexGrow: 0, cursor: 'pointer', textAlign: 'end' }}>
            <Tooltip title="">
              <IconButton  sx={{ p: 0 }}>
                <Avatar
                  alt=""
                />
              </IconButton>
            </Tooltip>

            <Typography textAlign="center" variant="button" ml={1} noWrap sx={{width: 100}}>
              ทดสอบ ระบบ
            </Typography>
            {/* <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => onLogout()}>
                <Typography textAlign="center">ออกจากระบบ</Typography>
              </MenuItem>
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -10,
    top: 5,
    // border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
export default Header;
