const express = require('express');
const router = express.Router();

const log = require('./middleware/initLog');
const credit = require('./resource/credit/index');
const responseMW = require('./middleware/responseMW');
const schema = require('./schemas/index');

router.post('/first-steps',
            log.initLog,
            schema.validatePost,
            credit.post,
            responseMW.validResponse
      );

module.exports = router;
