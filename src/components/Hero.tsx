import React from "react";
import { Box, Typography, Stack, Button, Container, useTheme } from "@mui/material";
import logoImg from "../app/assets/logo.png";
import hero from "../app/assets/hero.png";

const Hero: React.FC = () => {
  const theme = useTheme();
  const [role, setRole] = React.useState<"customer" | "master">("customer");
  
  return (
    <Box
      sx={{
        width: "calc(100vw - 120px)",
        minHeight: { xs: 600, md: 800 },
        background: `url(${hero}) center/cover no-repeat`,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
        p: 0,
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        pt: { xs: 8, md: 12 },
        pb: { xs: 4, md: 6 },
        mx: "60px",
        borderRadius: 1,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
      }}
    >
      <Container maxWidth="xl" sx={{ pt: 0, pb: 0 }}>
        {/* Контент hero */}
        <Box sx={{ 
          mt: { xs: 4, md: 8 }, 
          mb: { xs: 4, md: 8 }, 
          maxWidth: 800, 
          position: 'relative', 
          zIndex: 2,
          px: { xs: 3, md: 4 },
          ml: { xs: 2, md: 4 }
        }}>
          <Typography
            variant="h1"
            sx={{
              color: "#000",
              fontWeight: 700,
              fontSize: { xs: 40, md: 64 },
              lineHeight: 1.1,
              mb: 3,
              textAlign: "left",
              letterSpacing: 0,
              fontFamily: 'Montserrat',
            }}
          >
            От макета до 3D-модели
            <br />
            в пару кликов
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#000",
              fontWeight: 500,
              fontSize: { xs: 16, md: 20 },
              mb: 5,
              textAlign: "left",
              fontFamily: 'Montserrat',
            }}
          >
            Без лишних слов и трудностей
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
            <Button
              onClick={() => setRole("customer")}
              sx={{
                minWidth: 200,
                height: 56,
                borderRadius: 28,
                backgroundColor: "#9163FF",
                color: "#fff",
                fontWeight: 600,
                fontSize: 18,
                px: 4,
                boxShadow: "0 4px 12px rgba(145, 99, 255, 0.3)",
                textTransform: "none",
                transition: "all 0.2s",
                fontFamily: 'Montserrat',
                border: 'none',
                '&:hover, &:focus': {
                  backgroundColor: "#7B4FE8",
                  boxShadow: "0 6px 16px rgba(145, 99, 255, 0.4)",
                  transform: "translateY(-2px)",
                },
                '&:active': {
                  backgroundColor: "#6B3FD8",
                  transform: "translateY(0)",
                },
              }}
              aria-pressed={role === "customer"}
            >
              Я заказчик
            </Button>
            <Button
              onClick={() => setRole("master")}
              sx={{
                minWidth: 200,
                height: 56,
                borderRadius: 28,
                backgroundColor: "#fff",
                color: "#000",
                fontWeight: 600,
                fontSize: 18,
                px: 4,
                textTransform: "none",
                transition: "all 0.2s",
                fontFamily: 'Montserrat',
                border: 'none',
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                '&:hover, &:focus': {
                  backgroundColor: "#f5f5f5",
                  color: "#000",
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
                  transform: "translateY(-2px)",
                },
                '&:active': {
                  backgroundColor: "#e8e8e8",
                  transform: "translateY(0)",
                },
              }}
              aria-pressed={role === "master"}
            >
              Я мастер
            </Button>
          </Stack>
          
          
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
