const express = require('express');
const axios = require('axios');

const token = require(`${__basedir}/tokenFunction.js`);
const params = require(`${__basedir}/routes/createNamespace/parameters.js`);

// axios.defaults.headers.common['Authorization']='Bearer '.concat(jsonContent.token)
const log4js = require('log4js');

log4js.configure({
  appenders: { fileAppender: { type: 'file', filename: 'output.log' } },
  categories: { default: { appenders: ['fileAppender'], level: 'info' } },
});

const logger = log4js.getLogger();

function routecreateNamespace() {
  const router = express.Router();
  router.route('/')
    .post(async (req, res) => {
      console.log(req.body);
      const  clusterName  = req.body.clusterName;
      params.bodyParameters.namespace.fullName.name = req.body.namespaceName;
      params.bodyParameters.namespace.fullName.clusterName = req.body.clusterName;
      params.bodyParameters.namespace.meta.description = req.body.description;
      params.bodyParameters.namespace.spec.workspaceName = req.body.workspaceName;
      const accessToken = await token().then((resp) => resp.accessToken);

      const createWorkspace = await axios
        .post('https://capgeminietap.tmc.cloud.vmware.com/v1alpha1/clusters/'.concat(clusterName).concat('/namespaces'),
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
        output: createWorkspace,
      });
    });
  return router;
}

module.exports = routecreateNamespace;
