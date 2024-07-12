const notAllowedCharacters = /[\/\\?%*:|"<>]/;

const isValidFileName = (name) => {
    if (name.length === 0) return false;
    if (notAllowedCharacters.test(name)) return false;
    name = name.split('.');
    if (name.length < 2) return false;
    return true;
};

module.exports = { isValidFileName };
