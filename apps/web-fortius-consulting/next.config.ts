import type { NextConfig } from "next";

const legacyServicePaths = [
  "/servicios",
  "/analisis-y-medicion-de-impacto",
  "/asuntos-publicos",
  "/comunicacion-diseno-de-marca-y-campanas",
  "/constitucion-y-desarrollo-de-organizaciones",
  "/diseno-y-gestion-de-proyectos",
  "/headhunting-y-desarrollo-de-talento",
  "/investigacion-e-informes",
  "/movilizacion-social-y-alianzas",
  "/servicios-digitales",
  "/comunicacion-y-audiovisuales",
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/lander",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/privacy-policy-2",
        destination: "/politica-de-privacidad",
        permanent: true,
      },
      {
        source: "/privacy-policy-3",
        destination: "/politica-de-privacidad",
        permanent: true,
      },
      {
        source: "/politica-de-cookies-ue",
        destination: "/cookies",
        permanent: true,
      },
      ...legacyServicePaths.map((source) => ({
        source,
        destination: "/#servicios",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
