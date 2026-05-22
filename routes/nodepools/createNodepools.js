const express = require('express');
const axios = require('axios');

const token = require(`${__basedir}/tokenFunction.js`);
const params = require(`${__basedir}/routes/nodepools/parameters.js`);

// axios.defaults.headers.common['Authorization']='Bearer '.concat(jsonContent.token)
const log4js = require('log4js');

log4js.configure({
  appenders: { fileAppender: { type: 'file', filename: 'output.log' } },
  categories: { default: { appenders: ['fileAppender'], level: 'info' } },
});

const logger = log4js.getLogger();

function routesNodepool() {
  const router = express.Router();
  router.route('/')
    .post(async (req, res) => {
      params.bodyParameters.nodepool.fullName.clusterName = req.body.clusterName;
     // params.bodyParameters.nodepool.fullName.provisionedclusterName = req.body.clusterName;
      params.bodyParameters.nodepool.fullName.name = req.body.nodepoolName;
      params.bodyParameters.nodepool.spec.workerNodeCount = req.body.newNodeCount;
     // const nodepoolName=req.body.nodepoolName;
      const clusterName=req.body.clusterName;
      const accessToken = await token().then((resp) => resp.accessToken);

      const createNodepool = await axios
        .post('https://capgeminietap.tmc.cloud.vmware.com/v1alpha1/clusters/'.concat(clusterName)
        .concat('/nodepools'),
          params.bodyParameters, {
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
        output: createNodepool,
      });
    });
  return router;
}

module.exports = routesNodepool;
