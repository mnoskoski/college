/**
 * This function return a new express middleware
 *
 * @returns {object} an express middleware
 *
 */

const { ErrorHandler } = require("./handleError");
const message = require('../messages');

const validResponse = async ( req, res, next ) => {
  try {
    console.log( JSON.stringify(res.log.messages) );
    return res.status(200).send({
      success: true,
      data: res.log.data,
      error: null
    });  
  } catch (e) {
    await message.addMessage( res , 'error' , e.message );
    next(new ErrorHandler(500, 'Internal Server Erro.'));
  }
  

}

module.exports = {
  validResponse
};