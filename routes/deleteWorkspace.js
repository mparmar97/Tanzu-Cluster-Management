const express = require('express');
const axios = require('axios');
const log4js = require('log4js');
const token = require('../tokenFunction.js');



log4js.configure({
  appenders: { fileAppender: { type: 'file', filename: 'output.log' } },
  categories: { default: { appenders: ['fileAppender'], level: 'info' } },
});

const logger = log4js.getLogger();

function routesDeleteWorkspace() {
  const router = express.Router();
  router.route('/')
    .post(async (req, res) => {
      const  workspaceName  = req.body.workspaceName;
      const accessToken = await token().then((resp) => resp.accessToken);

      const deleteWorkspace = await axios
        .delete('https://capgeminietap.tmc.cloud.vmware.com/v1alpha1/workspaces/'.concat(workspaceName),
          {
            headers: {
              Authorization: 'Bearer '.concat(accessToken),
            },
          }).then((resp) => {
          logger.info(resp.data);
          return resp.data;
        })
        .catch((error) => {
          logger.info(error.response);
          return error.response.data;
        });
      res.status(200).json({
        output: deleteWorkspace,
      });
    });
  return router;
}

module.exports = routesDeleteWorkspace;
