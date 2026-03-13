module.exports = {
  apps: [
    {
      name: 'operoncore-faq-builder-pro',
      script: 'src/server.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        ANALYTICS_ENABLED: 'true',
        FREE_DAILY_LIMIT: '10',
        URL_FETCH_TIMEOUT_MS: '5000',
        URL_FETCH_MAX_BYTES: '300000',
        URL_FETCH_MAX_REDIRECTS: '3',
        JSON_BODY_LIMIT_BYTES: '1048576'
      }
    }
  ]
};
