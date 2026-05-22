const express = require('express');
const axios = require('axios');

const token = require(`${__basedir}/tokenFunction.js`);
const params = require(`${__basedir}/routes/createCluster/parameters.js`);

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
      params.bodyParameters.cluster.fullName.name = req.body.clusterName;
      //params.bodyParameters.cluster.spec.provisionedcluster.node_pool[0].full_name.cluster_name = req.body.clusterName;
      //params.bodyParameters.cluster.spec.provisionedcluster.node_pool[0].full_name.provisionedcluster_name = req.body.clusterName;
      params.bodyParameters.cluster.spec.tkgAws.topology.controlPlane.availabilityZones[0] = req.body.az_list;
      params.bodyParameters.cluster.spec.tkgAws.topology.nodePools[0].spec.tkgAws.availabilityZone = req.body.az_list;
      params.bodyParameters.cluster.spec.tkgAws.distribution.region = req.body.region;
      params.bodyParameters.cluster.spec.tkgAws.settings.security.sshKey = req.body.ssh_Key_Name;
      params.bodyParameters.cluster.spec.tkgAws.settings.network.provider.vpc.cidrBlock = req.body.cidr_block;
      params.bodyParameters.cluster.spec.tkgAws.distribution.version = req.body.kubernetesVersion;
      params.bodyParameters.cluster.spec.tkgAws.topology.nodePools[0].spec.tkgAws.version = req.body.kubernetesVersion;
     console.log(params);


      const accessToken = await token().then((resp) => resp.accessToken);

      const createCluster = await axios
        .post('https://capgeminietap.tmc.cloud.vmware.com/v1alpha1/clusters',
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
        output: createCluster,
      });
    });
  return router;
}

module.exports = routes;
