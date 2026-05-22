const express = require('express');
const axios = require('axios');

const token = require(`${__basedir}/tokenFunction.js`);
const params = require(`${__basedir}/routes/DeletePolicyForOrganization/parameters.js`);

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

      params.bindingDeltaList[0].role = req.body.roles;
        params.bindingDeltaList[0].subject.name = req.body.names;
        params.bindingDeltaList[0].subject.kind = req.body.kinds;

      console.log(params);
      const accessToken = await token().then((resp) => resp.accessToken);

      const deletePolicy = await axios
        .patch('https://capgeminietap.tmc.cloud.vmware.com/v1alpha1/organization:iam',
          params,{
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
        output: deletePolicy,
      });
    });
  return router;
}

module.exports = routes;
