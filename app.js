const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3004;
global.__basedir = __dirname;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use(bodyParser.json());
const generateToken = require('./routes/generatetoken.js')();
app.use('/api/k8s/cluster/management/generateToken', generateToken);

const createCluster = require('./routes/createCluster/createCluster.js')();
app.use('/api/k8s/cluster/management/createCluster', createCluster);

const createClusterGroup = require('./routes/createClusterGroup/createClusterGroup.js')();
app.use('/api/k8s/cluster/management/createClusterGroup', createClusterGroup);

const attachCluster = require('./routes/attachCluster/attachCluster.js')();
app.use('/api/k8s/cluster/management/attachCluster', attachCluster);

const listAttachedClusters = require('./routes/listAttachedClusters.js')();
app.use('/api/k8s/cluster/management/listClusters', listAttachedClusters);

const listClusterGroups = require('./routes/listClusterGroups.js')();
app.use('/api/k8s/cluster/management/listClusterGroups', listClusterGroups);

const getClusterInfo = require('./routes/getClusterInfo.js')();
app.use('/api/k8s/cluster/management/getClusterInfo', getClusterInfo);

const getClusters = require('./routes/getClusters.js')();
app.use('/api/k8s/cluster/management/getClusters', getClusters);

const deleteCluster = require('./routes/deleteCluster.js')();
app.use('/api/k8s/cluster/management/deleteCluster', deleteCluster);

const deleteClusterGroup = require('./routes/deleteClusterGroup.js')();
app.use('/api/k8s/cluster/management/deleteClusterGroup', deleteClusterGroup);

const accountDetails = require('./routes/accountDetails.js')();
app.use('/api/k8s/cluster/management/accountDetails', accountDetails);

const createWorkspace = require('./routes/createWorkspace/createWorkspace.js')();
app.use('/api/k8s/cluster/management/createWorkspace', createWorkspace);

const createNamespace = require('./routes/createNamespace/createNamespace.js')();
app.use('/api/k8s/cluster/management/createNamespace', createNamespace);

const listWorkspaces = require('./routes/listWorkspaces.js')();
app.use('/api/k8s/cluster/management/listWorkspaces', listWorkspaces);

const listworkloads = require('./routes/workloads.js')();
app.use('/api/k8s/cluster/management/workloads', listworkloads);

const listNamespaces = require('./routes/listNamespaces.js')();
app.use('/api/k8s/cluster/management/listNamespaces', listNamespaces);

const deleteWorkspace = require('./routes/deleteWorkspace.js')();
app.use('/api/k8s/cluster/management/deleteWorkspace', deleteWorkspace);

const deleteNamespace = require('./routes/deleteNamespace.js')();
app.use('/api/k8s/cluster/management/deleteNamespace', deleteNamespace);

const getWorkspaceInfo = require('./routes/getWorkspaceInfo.js')();
app.use('/api/k8s/cluster/management/getWorkspaceInfo', getWorkspaceInfo);

const getNamespaceInfo = require('./routes/getNamespaceInfo.js')();
app.use('/api/k8s/cluster/management/getNamespaceInfo', getNamespaceInfo);

const getClusterNamespace = require('./routes/getClusterNamespace.js')();
app.use('/api/k8s/cluster/management/getClusterNamespace', getClusterNamespace);

const getClusterWorkloads = require('./routes/getClusterWorkloads.js')();
app.use('/api/k8s/cluster/management/getClusterWorkloads', getClusterWorkloads);

const createNodepools = require('./routes/nodepools/createNodepools.js')();
app.use('/api/k8s/cluster/management/createNodepools', createNodepools);

const clusterGroupsPolicy = require('./routes/getPolicyForClusterGroup.js')();
app.use('/api/k8s/cluster/management/clusterGroupsPolicy', clusterGroupsPolicy);

const organizationGroupsPolicy = require('./routes/getPolicyForOrganization.js')();
app.use('/api/k8s/cluster/management/organizationGroupsPolicy', organizationGroupsPolicy);

const clusterPolicy = require('./routes/getPolicyForCluster.js')();
app.use('/api/k8s/cluster/management/clusterPolicy', clusterPolicy);

const inspection = require('./routes/inspection/inspection.js')();
app.use('/api/k8s/cluster/management/inspection', inspection);

const getRoles = require('./routes/getRoles.js')();
app.use('/api/k8s/cluster/management/getRoles', getRoles);

const searchDirectory= require('./routes/directorySearch/directorySearch.js')();
app.use('/api/k8s/cluster/management/searchDirectory', searchDirectory);

const namespacePolicy = require('./routes/getNamespacePolicy.js')();
app.use('/api/k8s/cluster/management/namespacePolicy',namespacePolicy);

const workspacePolicy = require('./routes/getPolicyforWorkspace.js')();
app.use('/api/k8s/cluster/management/workspacePolicy', workspacePolicy);

const editOrgPolicy = require('./routes/editOrganizationPolicy/OrganizationPolicy.js')();
app.use('/api/k8s/cluster/management/editOrgPolicy', editOrgPolicy);

const inspection_scans = require('./routes/inspection_scans.js')();
app.use('/api/k8s/cluster/management/inspection_scans', inspection_scans);

const deleteOrgPolicy = require('./routes/DeletePolicyForOrganization/deleteOrganizationPolicy.js')();
app.use('/api/k8s/cluster/management/deleteOrgPolicy', deleteOrgPolicy);

const editWorkspacePolicy = require('./routes/editWorkspacePolicy/workspacePolicy.js')();
app.use('/api/k8s/cluster/management/editWorkspacePolicy', editWorkspacePolicy);

const deleteWorkspaceRoles = require('./routes/deleteWorkspaceRoles.js')();
app.use('/api/k8s/cluster/management/deleteWorkspaceRoles', deleteWorkspaceRoles);

const editClusterGroupPolicy = require('./routes/editClusterGroupPolicy/clusterGroupPolicy.js')();
app.use('/api/k8s/cluster/management/editClusterGroupPolicy', editClusterGroupPolicy);

const editClusterPolicy = require('./routes/editClusterPolicy/clusterPolicy.js')();
app.use('/api/k8s/cluster/management/editClusterPolicy', editClusterPolicy);

const inspectionReport = require('./routes/inspection_report.js')();
app.use('/api/k8s/cluster/management/inspectionReport', inspectionReport);

app.use((req, res) => {
  res.status(402);
  res.json({
    error: {
      message: 'Some unknown error..!!Probably above link doesnt exist',
    },
  });
});

app.listen(port, () => {
  console.log(`Running on port${port}`);
});
