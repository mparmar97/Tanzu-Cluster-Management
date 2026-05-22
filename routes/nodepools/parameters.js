const createNodepools = {

    bodyParameters :
        {
          "nodepool": {
            "fullName": {
                "name": "abcd",
                "managementClusterName": "aws-hosted",
                "provisionerName": "awsaccesstanzu",
                "clusterName": "attach-9040"
            },
            "meta": {
                "description": ""
            },
            "spec": {
                "tkgAws": {
                    "instanceType": "m5.large",
                    "availabilityZone": "eu-west-1a"
                },
                "workerNodeCount": "1",
                "nodeLabels": {},
                "cloudLabels": {}
            }
        }
          }};
module.exports = createNodepools;
