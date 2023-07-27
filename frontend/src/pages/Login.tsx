import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { authSelector, login } from "../store/slices/authSlice";
// import { useAppDispatch } from "../store/store";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        UDCH
      </Link>
    </Typography>
  );
}

type Props = {};

export default function Login({}: Props) {
  const navigate = useNavigate();
  React.useEffect(() => {
    // if (authReducer.isAuthented) {
    //   navigate("/welcome");
    // }
  }, []);

  const handleSubmit = async () => {
    navigate("/welcome");
  };

  return (
    <Grid
      container
      // component="main"
      sx={{ height: "100vh" }}
    >
      {/* <CssBaseline /> */}
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        lg={8}
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1682687982360-3fbab65f9d50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)",
          backgroundRepeat: "no-repeat",
          // backgroundColor: (t) =>
          //   t.palette.mode === "light"
          //     ? t.palette.grey[50]
          //     : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Grid>
      <Grid item xs={12} sm={8} md={6} lg={4} sx={{ margin: "auto" }}>
        <Box
          sx={{
            // my: 15,
            mx: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <img
                src="/udch.png"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  padding: 0,
                  margin: 0,
                }}
                alt="logo"
              />
            </Grid>
            <Grid item xs={8} sx={{ margin: "auto", textAlign: "start" }}>
              <Typography variant="h6" noWrap>
                ระบบส่งข้อมูลผู้ป่วยมะเร็ง
              </Typography>
              <Typography variant="h6" noWrap>
                Cancer Anywhere (API)
              </Typography>
            </Grid>
          </Grid>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="ชื่อผู้ใช้งาน"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="รหัสผ่าน"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              เข้าสู่ระบบ
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  href="#"
                  variant="body2"
                >
                  ลืมรหัสผ่าน
                </Link>
              </Grid>
            </Grid> */}
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
