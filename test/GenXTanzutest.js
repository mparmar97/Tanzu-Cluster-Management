const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const { expect } = chai; // to solve error when using done(): “ReferenceError: expect is not defined

chai.use(chaiHttp);
describe('Testing ', () => {
  after(() => {});
  const url = 'http://localhost:3004';
  const requester = chai.request.agent(url);
  it('should give access token successfully', (done) => { // <= Pass in done callback
    requester
      .get('/api/k8s/cluster/management/generateToken')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(); // <= Call done to signal callback end
      });
  });
  it('should give list of clusters successfully', (done) => { // <= Pass in done callback
    requester
      .get('/api/k8s/cluster/management/listClusters')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(); // <= Call done to signal callback end
      });
  });

  it('should give list of cluster groups successfully', (done) => { // <= Pass in done callback
    requester
      .get('/api/k8s/cluster/management/listClusterGroups')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(); // <= Call done to signal callback end
      });
  });


  it('should create Cluster successfully', (done) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/createCluster')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(); // <= Call done to signal callback end
      });
  });
  it('should delete Cluster successfully', (done) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/deleteCluster')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(); // <= Call done to signal callback end
      });
  });

  it('should attach Cluster successfully', (done) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/attachCluster')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(); // <= Call done to signal callback end
      });
  });
  it('should fetch account Details successfully', (callback) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/accountDetails')
      .end((err, response) => {
        expect(response).to.have.status(200);
        callback(); // <= Call done to signal callback end
      });
  });

  it('should give details of any particular cluster', (callback) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/getClusterInfo')
      .end((err, response) => {
        expect(response).to.have.status(200);
        callback(); // <= Call done to signal callback end
      });
  });

  it('should create Cluster  group successfully', (done) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/createClusterGroup')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(); // <= Call done to signal callback end
      });
  });

  it('should delete Cluster group successfully', (done) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/deleteClusterGroup')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(); // <= Call done to signal callback end
      });
  });

  it('should give list of Clusters present in the group successfully', (done) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/getClusters')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(); // <= Call done to signal callback end
      });
  });

  it('should create Workspace successfully', (done) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/createWorkspace')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(); // <= Call done to signal callback end
      });
  });

  it('should create Namespace successfully', (done) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/createNamespace')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(); // <= Call done to signal callback end
      });
  });

  it('should show list of Workspaces successfully', (done) => { // <= Pass in done callback
    requester
      .get('/api/k8s/cluster/management/listWorkspaces')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(); // <= Call done to signal callback end
      });
  });

  it('should show list of Namespaces successfully', (done) => { // <= Pass in done callback
    requester
      .get('/api/k8s/cluster/management/listNamespaces')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(); // <= Call done to signal callback end
      });
  });

  it('should show list of workloads successfully', (done) => { // <= Pass in done callback
    requester
      .get('/api/k8s/cluster/management/workloads')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(); // <= Call done to signal callback end
      });
  });

  it('should delete Namespace successfully', (done) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/deleteNamespace')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(); // <= Call done to signal callback end
      });
  });

  it('should delete Workspace successfully', (done) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/deleteWorkspace')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(); // <= Call done to signal callback end
      });
  });

  it('should give namespace details correctly', (callback) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/getNamespaceInfo')
      .end((err, response) => {
        expect(response).to.have.status(200);
        callback(); // <= Call done to signal callback end
      });
  });

  it('should give workspace details correctly', (callback) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/getWorkspaceInfo')
      .end((err, response) => {
        expect(response).to.have.status(200);
        callback(); // <= Call done to signal callback end
      });
  });

  it('should give workspace associated with clusters correctly', (callback) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/getClusterNamespace')
      .end((err, response) => {
        expect(response).to.have.status(200);
        callback(); // <= Call done to signal callback end
      });
  });

  it('should give workloads associated with clusters correctly', (callback) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/getClusterWorkloads')
      .end((err, response) => {
        expect(response).to.have.status(200);
        callback(); // <= Call done to signal callback end
      });
  });

  it('should create Nodepools successfuly', (callback) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/createNodepools')
      .end((err, response) => {
        expect(response).to.have.status(200);
        callback(); // <= Call done to signal callback end
      });
  });

  it('should get policy for clustergroup successfuly ', (callback) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/clusterGroupsPolicy')
      .end((err, response) => {
        expect(response).to.have.status(200);
        callback(); // <= Call done to signal callback end
      });
  });



  it('should get policy for organization successfuly ', (callback) => { // <= Pass in done callback
    requester
      .get('/api/k8s/cluster/management/organizationGroupsPolicy')
      .end((err, response) => {
        expect(response).to.have.status(200);
        callback(); // <= Call done to signal callback end
      });
  });

  it('should get policy for cluster successfuly ', (callback) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/clusterPolicy')
      .end((err, response) => {
        expect(response).to.have.status(200);
        callback(); // <= Call done to signal callback end
      });
  });

  it('should get policy for namespace successfuly ', (callback) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/namespacePolicy')
      .end((err, response) => {
        expect(response).to.have.status(200);
        callback(); // <= Call done to signal callback end
      });
  });
  it('should get policy for workspace successfuly ', (callback) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/workspacePolicy')
      .end((err, response) => {
        expect(response).to.have.status(200);
        callback(); // <= Call done to signal callback end
      });
  });

  it('should edit policy for organization successfuly ', (callback) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/editOrgPolicy')
      .end((err, response) => {
        expect(response).to.have.status(200);
        callback(); // <= Call done to signal callback end
      });
  });
  it('should give cluster list for inspection ', (callback) => { // <= Pass in done callback
    requester
      .get('/api/k8s/cluster/management/inspection_scans')
      .end((err, response) => {
        expect(response).to.have.status(200);
         callback(); // <= Call done to signal callback end
      });
  });
  it('should search from directory successfuly ', (callback) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/searchDirectory')
      .end((err, response) => {
        expect(response).to.have.status(200);
        callback(); // <= Call done to signal callback end
      });
  });
  it('should delete policy for organization successfuly ', (callback) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/deleteOrgPolicy')
      .end((err, response) => {
        expect(response).to.have.status(200);
        callback(); // <= Call done to signal callback end
      });
  });

  it('should delete workspace roles successfuly ', (callback) => { // <= Pass in done callback
    requester
      .post('/api/k8s/cluster/management/deleteWorkspaceRoles')
      .end((err, response) => {
        expect(response).to.have.status(200);
        callback(); // <= Call done to signal callback end
      });
  });
  it('should give inspection details ', (callback) => { // <= Pass in done callback
      requester
        .post('/api/k8s/cluster/management/inspection')
        .end((err, response) => {
          expect(response).to.have.status(200);
           callback(); // <= Call done to signal callback end
        });
    });
    it('should give inspection report ', (callback) => { // <= Pass in done callback
          requester
            .post('/api/k8s/cluster/management/inspectionReport')
            .end((err, response) => {
              expect(response).to.have.status(200);
               callback(); // <= Call done to signal callback end
            });
        });  



});
