const {json} = require("body-parser");

exports.mails = (Val) => {
    let message = '';
    data = json(Val)
    message = data//= data.map(d =>d.email)

    return Val;
};
