const express = require('express');
const axios = require('axios');
const log4js = require('log4js');
const token = require('../tokenFunction.js');



log4js.configure({
  appenders: { fileAppender: { type: 'file', filename: 'output.log' } },
  categories: { default: { appenders: ['fileAppender'], level: 'info' } },
});

const logger = log4js.getLogger();

function routesgetWorkspaceInfo() {
  const router = express.Router();
  router.route('/')
    .post(async (req, res) => {
      const workspaceName  = req.body.workspaceName;
      const accessToken = await token().then((resp) => resp.accessToken);

      const workspaceDetails = await axios
        .get('https://capgeminietap.tmc.cloud.vmware.com/v1alpha1/clusters/*/namespaces?search_scope.group='.concat(workspaceName)
        .concat('&search_scope.workspace_name=').concat(workspaceName),
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
        output: workspaceDetails,
      });
    });
  return router;
}

module.exports = routesgetWorkspaceInfo;
