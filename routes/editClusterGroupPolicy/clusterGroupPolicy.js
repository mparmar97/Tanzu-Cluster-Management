const express = require('express');
const axios = require('axios');

const token = require(`${__basedir}/tokenFunction.js`);
const params = require(`${__basedir}/routes/editClusterGroupPolicy/parameters.js`);
const log4js = require('log4js');

log4js.configure({
  appenders: { fileAppender: { type: 'file', filename: 'output.log' } },
  categories: { default: { appenders: ['fileAppender'], level: 'info' } },
});

const logger = log4js.getLogger();

function routeEditClusterGroupPolicy() {
  const router = express.Router();
  router.route('/')
    .post(async (req, res) => {
      const clusterGroupName = req.body.clusterGroupName;

      const accessToken = await token().then((resp) => resp.accessToken);
      const presetClusterGroupRoles = await axios
        .get('https://capgeminietap.tmc.cloud.vmware.com/v1alpha/clustergroups:iam/'.concat(clusterGroupName),
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
      params.roleBindings = presetClusterGroupRoles.policyList[0].roleBindings
      params.roleBindings.push(req.body.roleDetails);
      const createClusterGroupPolicy = await axios
        .put('https://capgeminietap.tmc.cloud.vmware.com/v1alpha1/clustergroups:iam/'.concat(clusterGroupName),
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
        output: createClusterGroupPolicy,
      });
    });
  return router;
}

module.exports = routeEditClusterGroupPolicy;
