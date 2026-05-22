const createNamespaceParameters = {
    bodyParameters:
        {
            "namespace": {
                "fullName": {
                    "clusterName": "attach-1111",
                    "name": "manasi-namespace",
                    "managementClusterName": "aws-hosted",
                    "provisionerName": "awsaccesstanzu"
                },
                "meta": {
                    "description": "",
                    "labels": {}
                },
                "spec": {
                    "workspaceName": "animish-workspace"
                }
            }
        }
}
module.exports=createNamespaceParameters
