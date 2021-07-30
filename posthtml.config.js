module.exports = {
    plugins: {
      "posthtml-expressions": {
        locals: {
            BASE_ABSOLUTE_PUBLIC: process.env.BASE_ABSOLUTE_PUBLIC
        }
      }
    }
  };