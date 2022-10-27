module.exports = {
  launch: {
    headless: true,
    devtools: false,
    args: ["--disable-setuid-sandbox", "--no-sandbox"]
  },
  server: {
    command: "react-scripts start",
    port: 3000,
    launchTimeout: 60000,
    debug: true,
  }
}
