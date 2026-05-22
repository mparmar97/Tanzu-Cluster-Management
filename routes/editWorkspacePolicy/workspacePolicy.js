const express = require('express');
const axios = require('axios');

const token = require(`${__basedir}/tokenFunction.js`);
const params = require(`${__basedir}/routes/editWorkspacePolicy/parameters.js`);
const log4js = require('log4js');

log4js.configure({
  appenders: { fileAppender: { type: 'file', filename: 'output.log' } },
  categories: { default: { appenders: ['fileAppender'], level: 'info' } },
});

const logger = log4js.getLogger();

function routeEditWorkspacePolicy() {
  const router = express.Router();
  router.route('/')
    .post(async (req, res) => {
      const workspacesName=req.body.workspaceName;

      const accessToken = await token().then((resp) => resp.accessToken);
      const presetWorkspaceRoles = await axios
        .get('https://capgeminietap.tmc.cloud.vmware.com/v1alpha1/workspaces:iam/'.concat(workspacesName),
          {
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
      params.roleBindings = presetWorkspaceRoles.policyList[1].roleBindings
      params.roleBindings.push(req.body.roleDetails);
      const createWorkspaceRole = await axios
        .put('https://capgeminietap.tmc.cloud.vmware.com/v1alpha1/workspaces:iam/'.concat(workspacesName),
          params, {
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
        output: createWorkspaceRole,
      });
    });
  return router;
}

module.exports = routeEditWorkspacePolicy;
