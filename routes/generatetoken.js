const express = require('express');
const fs = require('fs');
const axios = require('axios');
const log4js = require('log4js');

log4js.configure({
  appenders: { fileAppender: { type: 'file', filename: 'output.log' } },
  categories: { default: { appenders: ['fileAppender'], level: 'info' } },
});

const logger = log4js.getLogger();
const credential = fs.readFileSync(`${__basedir}/credentials.json`);
const jsonContent = JSON.parse(credential);

function routes() {
  const tokenRouter = express.Router();
  tokenRouter.route('/')
    .get(async (req, res) => {
      const accesstoken = await axios
        .post('https://console.cloud.vmware.com/cphub/api/auth/v1/authn/accesstoken/', {
          refreshToken: jsonContent.refreshToken,
        })
        .then((resp) => {
          logger.info(resp.data);
          return resp.data;
        })
        .catch((err) => {
          logger.error(err.response.data);
          return err.response.data;
        });

      res.status(200).json({
        Credentials: accesstoken,
      });
    });
  return tokenRouter;
}

module.exports = routes;
