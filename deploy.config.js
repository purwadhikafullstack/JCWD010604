module.exports = {
  apps: [
    {
      name: "JCWD010604", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8604,
      },
      time: true,
    },
  ],
};
