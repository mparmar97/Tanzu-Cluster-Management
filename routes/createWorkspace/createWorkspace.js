const express = require('express');
const axios = require('axios');

const token = require(`${__basedir}/tokenFunction.js`);
const params = require(`${__basedir}/routes/createWorkspace/parameters.js`);

// axios.defaults.headers.common['Authorization']='Bearer '.concat(jsonContent.token)
const log4js = require('log4js');

log4js.configure({
  appenders: { fileAppender: { type: 'file', filename: 'output.log' } },
  categories: { default: { appenders: ['fileAppender'], level: 'info' } },
});

const logger = log4js.getLogger();

function routeCreateWorkspace() {
  const router = express.Router();
  router.route('/')
    .post(async (req, res) => {
      console.log(req.body);
      params.bodyParameters.workspace.fullName.name = req.body.workspaceName;
      params.bodyParameters.workspace.meta.description = req.body.description;
      const accessToken = await token().then((resp) => resp.accessToken);

      const createWorkspace = await axios
        .post('https://capgeminietap.tmc.cloud.vmware.com/v1alpha1/workspaces',
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
module.exports = routeCreateWorkspace;
