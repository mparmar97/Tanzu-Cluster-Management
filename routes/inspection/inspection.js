const express = require('express');
const axios = require('axios');

const token = require(`${__basedir}/tokenFunction.js`);
const params = require(`${__basedir}/routes/inspection/parameters.js`);
const log4js = require('log4js');

log4js.configure({
  appenders: { fileAppender: { type: 'file', filename: 'output.log' } },
  categories: { default: { appenders: ['fileAppender'], level: 'info' } },
});

const logger = log4js.getLogger();

function routesinspectionlite() {
    const router = express.Router();
    router.route('/')

    .post(async (req, res) => {
        params.inspection.fullName.clusterName = req.body.clusterName;
        params.inspection.spec.scanType = req.body.scanType;
        const clusterName = req.body.clusterName;
        const accessToken = await token().then((resp) => resp.accessToken);
        const inspectionDetails = await axios
        .post('https://capgeminietap.tmc.cloud.vmware.com/v1alpha/clusters/'.concat(clusterName).concat('/inspections') ,
          params,{
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
        output: inspectionDetails,
      });
    });
  return router;
}

module.exports = routesinspectionlite;
