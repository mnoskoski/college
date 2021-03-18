module.exports = (env = process.env) => {
  const varMap = new Map();
  varMap.set('NODE_ENV', env.NODE_ENV);
  
  varMap.forEach((value, key) => {
    if (value === undefined || value === '') {
      console.log(`${key} mandatory variable is missing`);
      process.exit();
    }
  });
};
