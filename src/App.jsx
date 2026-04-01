import { useEffect, useMemo, useState } from "react";
import {
  alpha,
  useTheme,
} from "@mui/material/styles";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import SmartDisplayRoundedIcon from "@mui/icons-material/SmartDisplayRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import serversData from "../data/server.json";
import adtLogo from "../assets/adt.webp";
import advLogo from "../assets/adv.webp";
import corvaxLogo from "../assets/corvax-forge.webp";
import kingdomLogo from "../assets/kingdom-dream.webp";
import headerLogo from "../assets/logo.png";
import ratgoreLogo from "../assets/ratgore.webp";
import artText from "../assets/ss14.art.txt?raw";
import stalkerLogo from "../assets/stalker.webp";
import wwdpLogo from "../assets/wwdp.webp";
import { useColorMode } from "./theme";

const sections = [
  { id: "home", label: "Главная" },
  { id: "servers", label: "Серверы" },
  { id: "plans", label: "О нас" },
  { id: "ideas", label: "Цели" },
  { id: "join", label: "Как вступить" },
];

const logoMap = {
  "assets/adt.webp": adtLogo,
  "assets/adv.webp": advLogo,
  "assets/corvax-forge.webp": corvaxLogo,
  "assets/kingdom-dream.webp": kingdomLogo,
  "assets/ratgore.webp": ratgoreLogo,
  "assets/stalker.webp": stalkerLogo,
  "assets/wwdp.webp": wwdpLogo,
};

const planItems = [
  {
    icon: <HubRoundedIcon />,
    title: "Общей инфраструкторой",
    text: "Совместные усилия для развития всего хаба и создания общей инфраструктуры для привлечения новой аудитории в игру.",
  },
  {
    icon: <BuildRoundedIcon />,
    title: "Поддержка разработки",
    text: "Совместная работа проектов над улучшением билдов, устранением уязвимостей и обменом опытом между разработчиками и админсоставом.",
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: "Работа по метрикам",
    text: "Отслеживание активностей в сообществе и кооперация на основе статистики, метрик и совместных решений по RU-сегменту.",
  },
];

const ideaItems = [
  {
    icon: <SmartDisplayRoundedIcon />,
    title: "Продвижение авторов",
    text: "Помогать ютуберам в продвижении и активно поддерживать качественный контент, чтобы авторы находили новую аудиторию.",
  },
  {
    icon: <TrendingUpRoundedIcon />,
    title: "Рост общего онлайна",
    text: "Системное и последовательное увеличение общего онлайна SS14, чтобы игра занимала более заметное место в игровом поле.",
  },
  {
    icon: <ShieldRoundedIcon />,
    title: "Ограничения РКН",
    text: "Возможные риски заранее учитываются и прорабатываются, чтобы площадка оставалась устойчивой и удобной для игроков.",
  },
];

const joinSteps = [
  {
    index: "01",
    title: "Зайдите на SS14 Devbus RU",
    text: "Перейдите в Discord-сервер ",
    href: "https://discord.gg/jtc3z5qVA2",
    label: "SS14 Devbus RU",
  },
  {
    index: "02",
    title: "Откройте форум заявок",
    text: "Напишите сообщение на ",
    href: "https://discord.com/channels/1479541729320501412/1479769963492413450",
    label: "форуме подачи заявок",
  },
  {
    index: "03",
    title: "Опишите свой сервер",
    text: "Расскажите про свой сервер и обязательно поставьте тег «Заявка».",
  },
  {
    index: "04",
    title: "Ожидайте решения",
    text: "После этого будет проведено голосование, по итогам которого будет принято решение о вашем вступлении в партнерскую программу Space Station 14 RU.",
  },
];

function SectionShell({ id, kicker, title, description, children, tonal = false }) {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id={id}
      sx={{
        py: { xs: 8, md: 11 },
      }}
    >
      <Card
        elevation={0}
        sx={{
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: tonal
            ? alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.08 : 0.04)
            : alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.84 : 0.88),
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Stack spacing={1.5} sx={{ mb: 4 }}>
            <Chip label={kicker} sx={{ alignSelf: "flex-start" }} />
            <Typography variant="h4">{title}</Typography>
            {description ? (
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
                {description}
              </Typography>
            ) : null}
          </Stack>
          {children}
        </CardContent>
      </Card>
    </Box>
  );
}

function InfoCard({ icon, title, text, emphasized = false }) {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: emphasized
          ? alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.18 : 0.08)
          : alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.78 : 0.95),
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 3,
              display: "grid",
              placeItems: "center",
              bgcolor: alpha(theme.palette.primary.main, 0.12),
              color: "primary.main",
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1" color="text.secondary">
            {text}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const theme = useTheme();
  const { mode, toggleMode } = useColorMode();
  const [activeSection, setActiveSection] = useState("home");

  const servers = useMemo(
    () =>
      (serversData?.servers ?? []).map((server) => ({
        ...server,
        logoUrl: logoMap[server.logo],
      })),
    [],
  );

  useEffect(() => {
    const trackedSections = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);

    const updateActiveSection = () => {
      const scrollAnchor = window.scrollY + 160;

      const currentSection = trackedSections.reduce((active, section) => {
        if (section.offsetTop <= scrollAnchor) {
          return section;
        }

        return active;
      }, trackedSections[0]);

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const handleF12 = (event) => {
      if (event.key !== "F12") {
        return;
      }

      console.log(`\n${artText}`);
    };

    window.addEventListener("keydown", handleF12);

    return () => {
      window.removeEventListener("keydown", handleF12);
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at top left, ${alpha(theme.palette.primary.light, 0.22)}, transparent 24%),
          radial-gradient(circle at top right, ${alpha(theme.palette.secondary.main, 0.16)}, transparent 20%),
          ${theme.palette.background.default}
        `,
      }}
    >
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          position: { xs: "static", md: "sticky" },
          top: 16,
          zIndex: (muiTheme) => muiTheme.zIndex.drawer + 20,
          mx: { xs: 0, md: "auto" },
          width: { xs: "100%", md: "min(calc(100% - 24px), 1280px)" },
          borderRadius: { xs: "0 0 28px 28px", md: "28px" },
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: `0 16px 48px ${alpha("#000", theme.palette.mode === "dark" ? 0.28 : 0.08)}`,
          bgcolor: alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.72 : 0.8),
        }}
      >
        <Toolbar
          sx={{
            alignItems: "center",
            gap: { xs: 1.25, md: 2 },
            minHeight: { xs: "auto", md: 84 },
            px: { xs: 1.75, md: 1.75 },
            py: { xs: 1.75, md: 1.5 },
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{
              minWidth: 0,
              flexGrow: 1,
              pr: { xs: 0, md: 1 },
              minHeight: { md: 56 },
            }}
          >
            <Box
              sx={{
                width: { xs: 44, md: 52 },
                height: { xs: 44, md: 52 },
                borderRadius: "28px",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={headerLogo}
                alt=""
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.1,
                  fontSize: { xs: "0.98rem", md: "1rem" },
                }}
              >
                Space Station 14 RU
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            spacing={0.75}
            alignItems="center"
            sx={{
              display: { xs: "none", md: "flex" },
              flexWrap: "wrap",
              justifyContent: "flex-end",
              flexShrink: 0,
            }}
          >
            {sections.map((section) => (
              <Button
                key={section.id}
                href={`#${section.id}`}
                color={activeSection === section.id ? "primary" : "inherit"}
                variant={activeSection === section.id ? "contained" : "text"}
                sx={{
                  minWidth: "auto",
                  minHeight: 44,
                  px: 2,
                  borderRadius: 2.5,
                  color: activeSection === section.id ? undefined : "text.secondary",
                }}
              >
                {section.label}
              </Button>
            ))}
          </Stack>

          <IconButton
            onClick={toggleMode}
            color="primary"
            sx={{
              ml: { xs: "auto", md: 0 },
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.46 : 0.82),
              borderRadius: 2.5,
              alignSelf: { xs: "flex-start", md: "center" },
              display: { xs: "none", md: "inline-flex" },
            }}
          >
            {mode === "dark" ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 2, md: 5 },
          mt: { xs: 0, md: 0 },
        }}
      >
        <Box
          component="section"
          id="home"
          sx={{
            pt: { xs: 3, md: 8 },
            pb: { xs: 8, md: 10 },
            scrollMarginTop: { xs: 24, md: 120 },
          }}
        >
          <Grid container spacing={3} alignItems="stretch">
            <Grid size={{ xs: 12, lg: 8 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.82 : 0.9),
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 6 } }}>
                  <Stack spacing={3}>
                    <Chip label="Главная" sx={{ alignSelf: "flex-start" }} />
                    <Typography variant="h1" sx={{ fontSize: { xs: "3rem", md: "5.25rem" }, maxWidth: 760 }}>
                      Объединение Space Station 14 RU
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 780, fontWeight: 400 }}>
                      Единая витрина серверов Space Station 14 RU с общими планами, идеями
                      развития сообщества и понятным порядком вступления.
                    </Typography>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                      <Button variant="contained" size="large" href="#servers">
                        Серверы-партнеры
                      </Button>
                      <Button variant="outlined" size="large" href="#join">
                        Как вступить
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, lg: 4 }}>
              <Stack spacing={3} sx={{ height: "100%" }}>
                <Card
                  elevation={0}
                  sx={{
                    flex: 1,
                    border: `1px solid ${theme.palette.divider}`,
                    bgcolor: alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.74 : 0.92),
                  }}
                >
                  <CardContent sx={{ p: 3.5 }}>
                    <Stack spacing={1.5}>
                      <Typography variant="overline" color="text.secondary">
                        Фокус
                      </Typography>
                      <Typography variant="h5">Развитие SS14 RU</Typography>
                      <Typography variant="body1" color="text.secondary">
                        Общей инфраструкторой, обмен опытом, продвижение контента и рост общей
                        аудитории.
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>

                <Card
                  elevation={0}
                  sx={{
                    flex: 1,
                    border: `1px solid ${theme.palette.divider}`,
                    bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.18 : 0.08),
                  }}
                >
                  <CardContent sx={{ p: 3.5 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            width: 52,
                            height: 52,
                            borderRadius: "20px",
                            display: "grid",
                            placeItems: "center",
                            bgcolor: alpha(theme.palette.primary.main, 0.14),
                            color: "primary.main",
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                          }}
                        >
                          <HubRoundedIcon />
                        </Box>
                        <Box>
                          <Typography variant="overline" color="text.secondary">
                            Партнеры
                          </Typography>
                          <Typography variant="h5">{servers.length} серверов</Typography>
                        </Box>
                      </Stack>
                      <Box
                        sx={{
                          height: 8,
                          borderRadius: 999,
                          overflow: "hidden",
                          bgcolor: alpha(theme.palette.primary.main, 0.08),
                        }}
                      >
                        <Box
                          sx={{
                            width: `${Math.min(100, servers.length * 12)}%`,
                            height: "100%",
                            borderRadius: 999,
                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                          }}
                        />
                      </Box>
                      <Typography variant="body1" color="text.secondary">
                        На странице перечислены проекты, подключённые к партнёрской программе и
                        участвующие в общей экосистеме SS14 RU.
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <SectionShell
          id="servers"
          kicker="Серверы"
          title="Серверы-партнеры"
          description="Ниже собраны проекты, участвующие в партнерской программе Space Station 14 RU."
        >
          <Grid container spacing={2.5}>
            {servers.map((server) => (
              <Grid key={server.name} size={{ xs: 12, xl: 6 }}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    border: `1px solid ${theme.palette.divider}`,
                    bgcolor: alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.78 : 0.96),
                    position: "relative",
                    zIndex: 0,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={2.5}
                      alignItems={{ xs: "stretch", sm: "flex-start" }}
                      sx={{ height: "100%" }}
                    >
                      <Box
                        sx={{
                          width: { xs: "100%", sm: 128 },
                          minWidth: { xs: "100%", sm: 128 },
                          aspectRatio: "1 / 1",
                          height: { xs: "auto", sm: 128 },
                          borderRadius: "28px",
                          overflow: "hidden",
                          position: "relative",
                          bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.1 : 0.06),
                          border: `1px solid ${alpha(theme.palette.divider, 0.85)}`,
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            inset: 0,
                            background: `radial-gradient(circle at 30% 20%, ${alpha(
                              theme.palette.primary.light,
                              0.35,
                            )}, transparent 52%)`,
                          }}
                        />
                        <Box
                          component="img"
                          src={server.logoUrl}
                          alt={`Логотип ${server.name}`}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                            position: "relative",
                            zIndex: 1,
                          }}
                        />
                      </Box>

                      <Stack spacing={1.5} sx={{ minWidth: 0, flexGrow: 1 }}>
                        <Stack
                          direction={{ xs: "column", md: "row" }}
                          spacing={1.5}
                          justifyContent="space-between"
                          alignItems={{ xs: "flex-start", md: "flex-start" }}
                        >
                          <Stack spacing={1}>
                            <Typography variant="h6">{server.name}</Typography>
                          </Stack>

                          <Button
                            variant="outlined"
                            href={server.discord}
                            target="_blank"
                            rel="noreferrer"
                            endIcon={<ArrowOutwardRoundedIcon />}
                            sx={{
                              flexShrink: 0,
                              width: { xs: "100%", md: "auto" },
                            }}
                          >
                            Discord
                          </Button>
                        </Stack>

                        <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1 }}>
                          {server.description}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </SectionShell>

        <SectionShell id="plans" kicker="О нас" title="Чем мы совместно занимаемся" tonal>
          <Grid container spacing={2.5}>
            {planItems.map((item) => (
              <Grid key={item.title} size={{ xs: 12, md: 4 }}>
                <InfoCard {...item} />
              </Grid>
            ))}
          </Grid>
        </SectionShell>

        <SectionShell id="ideas" kicker="Цели" title="Наши планы по развитию">
          <Grid container spacing={2.5}>
            {ideaItems.map((item, index) => (
              <Grid key={item.title} size={{ xs: 12, md: index === 0 ? 6 : 3 }}>
                <InfoCard {...item} emphasized={index === 0} />
              </Grid>
            ))}
          </Grid>
        </SectionShell>

        <SectionShell
          id="join"
          kicker="Как вступить"
          title="Подача заявки"
          description="Для вступления в партнерскую программу используйте стандартный порядок подачи."
          tonal
        >
          <Stack spacing={2}>
            {joinSteps.map((step) => (
              <Card
                key={step.index}
                elevation={0}
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.72 : 0.94),
                  borderRadius: "28px",
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5}>
                    <Box
                      sx={{
                        minWidth: 72,
                        height: 56,
                        px: 2,
                        borderRadius: 3,
                        display: "grid",
                        placeItems: "center",
                        bgcolor: alpha(theme.palette.primary.main, 0.12),
                        color: "primary.main",
                        fontWeight: 700,
                        fontSize: "1.125rem",
                      }}
                    >
                      {step.index}
                    </Box>
                    <Stack spacing={1}>
                      <Typography variant="h6">{step.title}</Typography>
                      <Typography variant="body1" color="text.secondary">
                        {step.text}{" "}
                        {step.href ? (
                          <Link href={step.href} target="_blank" rel="noreferrer" underline="hover">
                            {step.label}
                          </Link>
                        ) : null}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </SectionShell>

        <Box
          component="footer"
          sx={{
            pt: { xs: 4, md: 5 },
            pb: 0,
            mt: { xs: 1, md: 2 },
          }}
        >
          <Card
            elevation={0}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.82 : 0.9),
              borderRadius: { xs: "28px 28px 0 0", md: "28px 28px 0 0" },
            }}
          >
            <CardContent sx={{ p: { xs: 2.75, md: 4 } }}>
              <Stack
                direction={{ xs: "column", lg: "row" }}
                justifyContent="space-between"
                spacing={{ xs: 2.5, md: 2 }}
                alignItems={{ xs: "flex-start", lg: "flex-start" }}
              >
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Space Station 14 RU
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520 }}>
                    Сайт с информацией о партнёрских серверах, планах, идеях и вступлении в
                    программу.
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ maxWidth: { xs: "100%", lg: 620 } }}
                >
                  Сайт никак не связан со Space Wizard Federation и официальными разработчиками
                  Space Station 14 Space Wizard{" "}
                  <Link href="https://spacestation14.io" target="_blank" rel="noreferrer" underline="hover">
                    spacestation14.io
                  </Link>
                  .
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
