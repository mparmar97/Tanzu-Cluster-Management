const fs = require('fs');
const axios = require('axios');

const credentials = fs.readFileSync('./credentials.json');
const credentialInfo = JSON.parse(credentials);

const log4js = require('log4js');

log4js.configure({
  appenders: { fileAppender: { type: 'file', filename: 'output.log' } },
  categories: { default: { appenders: ['fileAppender'], level: 'info' } },
});

const logger = log4js.getLogger();

const routes = async () => await axios
  .post('https://console.cloud.vmware.com/cphub/api/auth/v1/authn/accesstoken/', {
    refreshToken: credentialInfo.refreshToken,
  })
  .then((resp) => {
    logger.info(resp.data);
    return resp.data;
  })
  .catch((err) => {
    logger.error(err);
  });
module.exports = routes;
