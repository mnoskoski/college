const addMessageData = async ( res , message ) => {
  try {
    res.log.data = message;
    return true;
  } catch (e) {
    console.error(JSON.stringify( ` Fail add message data ${e.message}` ));
    return res.status(400).send({ success: false, data: res.log });  
  }
}

const addMessage = async ( res , key , message ) => {
  try {  
    res.log.messages = Object.assign( res.log.messages , { [key]: message });
    return false;
  } catch (e) {
    console.error(err.stack);
    console.error(JSON.stringify( `Fail add message: ${e.message}` ));
    return false;
  }
}

module.exports = {
  addMessageData,
  addMessage
};
