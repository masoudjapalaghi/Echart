/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["echarts", "zrender"]);
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withTM(nextConfig)
