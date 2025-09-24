// src/pages/authentication.jsx
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";
import { Snackbar, Alert } from "@mui/material";

const theme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(0); // 0 = sign in, 1 = sign up
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(name, username, password);
        const resultMessage =
          result?.message || result || "Registration successful 🎉";
        setMessage(resultMessage);
        setOpen(true);
        setName("");
        setUsername("");
        setPassword("");
        setFormState(0);
      }
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Something went wrong";
      setError(msg);
      setMessage(msg);
      setOpen(true);
    }
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          minHeight: "100vh",
          backgroundColor: "#e9cfff", // page purple
        }}
      >
        <CssBaseline />

        {/* Center wrapper */}
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={10}
            md="auto"
            sx={{
              // ✅ Fixed width on desktop, prevent shrinking
              flexBasis: { md: "380px" },
              flexShrink: 0,
              width: { xs: "100%", md: "380px" },

              // ✅ Shift right on desktop (adjust % here)
              ml: { md: "300%" }, // change to "50%" or "70%" as you want

              mr: { md: 2 },
            }}
          >
            <Paper
              elevation={10}
              sx={{
                width: "100%",
                borderRadius: 3,
                p: { xs: 3, sm: 5 },
                bgcolor: "rgba(255,255,255,0.98)",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    m: 1,
                    bgcolor: "secondary.main",
                    width: 64,
                    height: 64,
                    mb: 2,
                  }}
                >
                  <LockOutlinedIcon fontSize="large" />
                </Avatar>

                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <Button
                    variant={formState === 0 ? "contained" : "outlined"}
                    onClick={() => {
                      setFormState(0);
                      setError("");
                    }}
                    size="small"
                  >
                    Sign In
                  </Button>
                  <Button
                    variant={formState === 1 ? "contained" : "outlined"}
                    onClick={() => {
                      setFormState(1);
                      setError("");
                    }}
                    size="small"
                  >
                    Sign Up
                  </Button>
                </Box>

                <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
                  {formState === 1 && (
                    <TextField
                      margin="dense"
                      size="small"
                      required
                      fullWidth
                      id="name"
                      label="Full Name"
                      name="name"
                      value={name}
                      autoFocus
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}

                  <TextField
                    margin="dense"
                    size="small"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  <TextField
                    margin="dense"
                    size="small"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                  />

                  {error ? (
                    <Box sx={{ color: "error.main", mt: 1, mb: 1 }}>{error}</Box>
                  ) : null}

                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 2,
                      mb: 0,
                      py: 1.25,
                      fontWeight: 600,
                      letterSpacing: 0.6,
                    }}
                    onClick={handleAuth}
                  >
                    {formState === 0 ? "Login" : "Register"}
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* ✅ Snackbar with Alert */}
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={error ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Grid>
    </ThemeProvider>
  );
}
