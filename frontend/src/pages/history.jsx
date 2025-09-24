import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton, Grid } from "@mui/material";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history || []);
      } catch {
        // could trigger snackbar here
      }
    };

    fetchHistory();
  }, [getHistoryOfUser]);

  let formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#e9cfff",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        pt: 3,
        px: { xs: 2, md: 6 },
      }}
    >
      {/* top back button */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={() => routeTo("/home")}>
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1 }}>
          Call History
        </Typography>
      </Box>

      {/* content area */}
      <Grid container spacing={2}>
        {meetings && meetings.length > 0 ? (
          meetings.map((m, i) => (
            <Grid key={i} item xs={12} sm={6} md={4}>
              <Card variant="outlined" sx={{ minHeight: 120 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Code: {m.meetingCode}
                  </Typography>

                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Date: {formatDate(m.date)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box
              sx={{
                bgcolor: "rgba(255,255,255,0.85)",
                p: 3,
                borderRadius: 2,
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                textAlign: "center",
                maxWidth: 720,
                mx: "auto",
              }}
            >
              <Typography>No meeting history available yet.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
