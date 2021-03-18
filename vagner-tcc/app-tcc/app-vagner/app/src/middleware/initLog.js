const { ErrorHandler } = require("./handleError");
const message = require('../messages');

const initLog = async ( req , res , next ) => {
    try {        
        res.log = {            
            messages: { 
                method: req.method 
            },
            data: {
                
            }
        };
        return next();
    } catch (e) {
        await message.addMessage( res , 'error' , e.message );
        return next(new ErrorHandler(500,`Fail init Log ${e.message}`));
    }
}

module.exports = {
    initLog
}