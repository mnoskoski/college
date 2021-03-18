const message = require('../../messages');
const { ErrorHandler } = require('../../middleware/handleError');

module.exports =  async ( req, res, next ) => {
    try {
        /** Armazena os parâmetro passado para caso ocorra erro */
        await message.addMessage( res , 'postCredit' , 'success' );
        await message.addMessageData( res , 'credit realizzed');
        
        return next();
    } catch (e) {
        return next(new ErrorHandler(500, e.message));
    }
};