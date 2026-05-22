const express = require('express');
const axios = require('axios');

const token = require(`${__basedir}/tokenFunction.js`);
const params = require(`${__basedir}/routes/editClusterPolicy/parameters.js`);
const log4js = require('log4js');

log4js.configure({
  appenders: { fileAppender: { type: 'file', filename: 'output.log' } },
  categories: { default: { appenders: ['fileAppender'], level: 'info' } },
});

const logger = log4js.getLogger();

function routeEditClusterPolicy() {
  const router = express.Router();
  router.route('/')
    .post(async (req, res) => {
      const clusterName = req.body.clusterName;

      const accessToken = await token().then((resp) => resp.accessToken);
      const presetClusterRoles = await axios
        .get('https://capgeminietap.tmc.cloud.vmware.com/v1alpha/clusters:iam/'.concat(clusterName),
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
      params.roleBindings = presetClusterRoles.policyList[2].roleBindings
      params.roleBindings.push(req.body.roleDetails);
      const createClusterPolicy = await axios
        .put('https://capgeminietap.tmc.cloud.vmware.com/v1alpha/clusters:iam/'.concat(clusterName),
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
        output: createClusterPolicy,
      });
    });
  return router;
}

module.exports = routeEditClusterPolicy;
