const express = require('express');
const axios = require('axios');
const log4js = require('log4js');
const token = require('../tokenFunction.js');



log4js.configure({
  appenders: { fileAppender: { type: 'file', filename: 'output.log' } },
  categories: { default: { appenders: ['fileAppender'], level: 'info' } },
});

const logger = log4js.getLogger();

function routesinspection_report() {
    const router = express.Router();
    router.route('/')

    .post(async (req, res) => {
      const accessToken = await token().then((resp) => resp.accessToken);
      const {clusterName}  = req.body ;
      const {INSPECTIONNAME} = req.body;
      const inspectionreport = await axios
      .get('https://capgeminietap.tmc.cloud.vmware.com/v1alpha/clusters/'.concat(clusterName).concat('/inspections/').concat(INSPECTIONNAME).concat('?fullName.location=global'),
          {
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
        output: inspectionreport,
      });
    });
  return router;
}

module.exports = routesinspection_report;
