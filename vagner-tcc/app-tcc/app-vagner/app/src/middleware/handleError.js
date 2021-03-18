const messages  = require('../messages');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = async (err, res) => {
  try {

    const { statusCode, message } = err;    

    if (statusCode == 500) {
      /*
        Caso seja um retorno 500 é tratado como erro de aplicação e passa para o console o erro
      */
      console.error(JSON.stringify(err.stack));
      return res.status(500).send({
        success: false,
        error: "ApplicationException"
      });
    }else{
      /*
        Caso o erro não seja um retorno 500 é tratado como erro de negocio
        o log do erro fica a nível de info
      */
      await messages.addMessage( res , 'statusCode' , statusCode );
      await messages.addMessage( res , 'Exception' , message );
      console.log(JSON.stringify(res.log.messages));
      if ( res.log.data.length > 0 ) {
        console.log(JSON.stringify(res.log.data));
      }
      return res.status(statusCode).send({
        success: false,
        data: "null",
        error: message
      });
    }

  } catch (e) {
    console.error(err.stack);
    console.error(JSON.stringify(err.stack));
    res.status(500).send({
      success: false,
      error: {
        message: "ApplicationException",
        name: "Exception",
        code: 0,
        status: 500,
        errors: 'Internal Server error'
      }
    });

  }

};

module.exports = {
  ErrorHandler,
  handleError
};
