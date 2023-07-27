import { Box, Grid, Paper, Typography } from "@mui/material";
import Header from "../layouts/Header";

type Props = {};

function Welcome({}: Props) {
  return (
    <>
      <Header />

      <Grid
        container
        spacing={0}
        direction="column"
        style={{
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Grid item sx={{ my: 5 }}>
          <Typography variant="h4" p={2} mb={2} gutterBottom>
            ระบบส่งข้อมูลผู้ป่วย Cancer Anywhere (API)
          </Typography>

          <p className="typewriter">
            <span style={{ position: "relative", bottom: 8, marginLeft: 10 }}>
              ยินดีต้อนรับ{" "}
            </span>
            <img
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
              }}
              alt="avatar"
              src="/udch.png"
            />
            <span
              style={{ position: "relative", bottom: 8, marginLeft: 10 }}
            >{`คุณ ทดสอบ ระบบ 🚀`}</span>
          </p>
          <Grid container spacing={1} sx={{ marginTop: 2 }}>
            <Grid item xs={12} md={6} sx={{ mx: { xs: 2, md: 0 } }}>
              <Box>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/10016/10016926.png"
                  alt="icon"
                  width={160}
                  style={{ marginLeft: 30 }}
                />
              </Box>
              <Paper
                sx={{
                  marginTop: -10,
                  paddingTop: 8,
                  paddingBottom: 2,
                  borderRadius: 5,
                }}
                elevation={6}
              >
                <Typography gutterBottom variant="h3" component="div">
                  0 คน
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  ผู้ป่วยรายใหม่
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mx: { xs: 2, md: 0 } }}>
              <Box>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1163/1163784.png"
                  alt="icon"
                  width={160}
                />
              </Box>
              <Paper
                sx={{
                  marginTop: -10,
                  paddingTop: 8,
                  paddingBottom: 2,
                  borderRadius: 5,
                }}
                elevation={6}
              >
                <Typography gutterBottom variant="h3" component="div">
                  0 คน
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  ผู้ป่วยส่งข้อมูลแล้ว
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Welcome;
