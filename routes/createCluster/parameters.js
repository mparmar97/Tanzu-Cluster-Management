const tanzuCreateClusterParams = {

  bodyParameters: {
    "cluster": {
      "fullName": {
        "name": "attach-1111",
        "managementClusterName": "aws-hosted",
        "provisionerName": "awsaccesstanzu"
      },
      "meta": {
        "description": "",
        "labels": {}
      },
      "spec": {
        "clusterGroupName": "default",
        "tkgAws": {
          "distribution": {
            "provisionerCredentialName": "awsaccesstanzu",
            "region": "eu-west-1",
            "version": "1.19.1-2-amazon2"
          },
          "settings": {
            "network": {
              "cluster": {
                "pods": [
                  {
                    "cidrBlocks": "192.168.0.0/16"
                  }
                ],
                "services": [
                  {
                    "cidrBlocks": "10.96.0.0/12"
                  }
                ]
              },
              "provider": {
                "vpc": {
                  "cidrBlock": "10.0.0.0/16"
                }
              }
            },
            "security": {
              "sshKey": "my-tmc-kp"
            }
          },
          "topology": {
            "controlPlane": {
              "availabilityZones": [
                "eu-west-1a"
              ],
              "instanceType": "m5.large",
              "highAvailability": false
            },
            "nodePools": [
              {
                "spec": {
                  "workerNodeCount": "1",
                  "tkgAws": {
                    "instanceType": "m5.large",
                    "availabilityZone": "eu-west-1a",
                    "version": "1.19.1-2-amazon2"
                  },
                },
                "info": {
                  "name": "default-node-pool"
                }
              },
            ],
          },
        },
      },
    }
  },
};

module.exports = tanzuCreateClusterParams;
