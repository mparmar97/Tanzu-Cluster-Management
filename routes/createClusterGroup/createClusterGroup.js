const express = require('express');
const axios = require('axios');

const token = require(`${__basedir}/tokenFunction.js`);
const params = require(`${__basedir}/routes/createClusterGroup/parameters.js`);

// axios.defaults.headers.common['Authorization']='Bearer '.concat(jsonContent.token)
const log4js = require('log4js');

log4js.configure({
  appenders: { fileAppender: { type: 'file', filename: 'output.log' } },
  categories: { default: { appenders: ['fileAppender'], level: 'info' } },
});

const logger = log4js.getLogger();

function routes() {
  const router = express.Router();
  router.route('/')
    .post(async (req, res) => {
      console.log(req.body);
      params.bodyParameters.clusterGroup.fullName.name = req.body.clusterGroupName;
      params.bodyParameters.clusterGroup.meta.description = req.body.description;
      const accessToken = await token().then((resp) => resp.accessToken);

      const createClusterGroup = await axios
        .post('https://capgeminietap.tmc.cloud.vmware.com/v1alpha1/clustergroups',
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
        output: createClusterGroup,
      });
    });
  return router;
}

module.exports = routes;
