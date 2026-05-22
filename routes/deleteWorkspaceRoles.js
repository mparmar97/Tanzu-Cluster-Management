const express = require('express');
const axios = require('axios');

const token = require(`${__basedir}/tokenFunction.js`);
const log4js = require('log4js');

log4js.configure({
  appenders: { fileAppender: { type: 'file', filename: 'output.log' } },
  categories: { default: { appenders: ['fileAppender'], level: 'info' } },
});

const logger = log4js.getLogger();

function routeDeleteWorkspaceRoles() {
  const router = express.Router();
  router.route('/')
    .post(async (req, res) => {
      const roleDetails = req.body.roleDetails;
      const workspaceName = req.body.workspaceName
      const accessToken = await token().then((resp) => resp.accessToken);

      const deleteWorkspaceRoles = await axios
        .patch('https://capgeminietap.tmc.cloud.vmware.com/v1alpha/workspaces:iam/'.concat(workspaceName),
        roleDetails, {
            headers: {
              Authorization: 'Bearer '.concat(accessToken),
            },
          }).then((resp) => {
          logger.info(resp.data);
          return resp.data;
        })
        .catch((error) => {
          logger.error(error.response);
          return error.response.data;
        });
      res.status(200).json({
        output: deleteWorkspaceRoles,
      });
    });
  return router;
}
module.exports = routeDeleteWorkspaceRoles;
