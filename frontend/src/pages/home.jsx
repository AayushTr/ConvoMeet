import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Button, TextField, Box, Grid } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <>
      {/* Page wrapper with purple background */}
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#e9cfff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Navbar */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, sm: 4, md: 6 },
            py: 2,
            backgroundColor: "#e9cfff", // navbar same purple
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/ConvoMeet.png"
              alt="ConvoMeet logo"
              style={{ height:150 , width : "ayto"}}
            />
          </Box>

          {/* Right controls */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* History link: icon + text together */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
              }}
              onClick={() => navigate("/history")}
            >
              <RestoreIcon sx={{ fontSize: 28 }} />
              <span style={{ marginLeft: "6px", fontSize: "16px" }}>
                History
              </span>
            </Box>

            {/* Logout button */}
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/auth");
              }}
              variant="text"
            >
              Logout
            </Button>
          </Box>
        </Box>

        {/* Main content */}
        <Grid
          container
          sx={{
            flex: 1,
            alignItems: "flex-start",
            pt: { xs: 2, md: 6 },
            px: { xs: 2, md: 6 },
          }}
        >
          {/* Left panel */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ maxWidth: 640 }}>
              <h2 style={{ marginTop: 0 }}>
                Providing Quality Video Call Just Like Quality Education
              </h2>

              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <TextField
                  onChange={(e) => setMeetingCode(e.target.value)}
                  id="outlined-basic"
                  label="Meeting Code"
                  variant="outlined"
                  size="small"
                />
                <Button onClick={handleJoinVideoCall} variant="contained">
                  Join
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right panel */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
              alignItems: "flex-start",
              mt: { xs: 4, md: 0 },
            }}
          >
            <Box
              component="img"
              src="/logo3.png"
              alt=""
              sx={{
                width: { xs: "60%", md: "80%" },
                maxWidth: 520,
                borderRadius: 2,
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                backgroundColor: "#fff",
                p: 2,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default withAuth(HomeComponent);
