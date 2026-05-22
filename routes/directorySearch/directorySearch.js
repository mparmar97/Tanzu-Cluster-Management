const express = require('express');
const axios = require('axios');

const token = require(`${__basedir}/tokenFunction.js`);

const log4js = require('log4js');

log4js.configure({
    appenders: { fileAppender: { type: 'file', filename: 'output.log' } },
    categories: { default: { appenders: ['fileAppender'], level: 'info' } },
});

const logger = log4js.getLogger();

function routesSearchFromDirectory() {
    const router = express.Router();
    router.route('/')
        .post(async (req, res) => {

            const query = req.body;

            const accessToken = await token().then((resp) => resp.accessToken);

            const searchDirectory = await axios
                .post('https://capgeminietap.tmc.cloud.vmware.com/v1alpha1/iam/directory:search',
                    query, {
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
                output: searchDirectory,
            });
        });
    return router;
}

module.exports = routesSearchFromDirectory;
