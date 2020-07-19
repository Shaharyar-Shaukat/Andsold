const nodemailer = require('nodemailer')
const id = require('./config.json')
const User = require('../models/user');

// exports.mailparse = (req, res,next,)=>{
//     User.find({'premium': true}, { 'email': 1,_id:0 }, function(err,data){
//       if(err) console.log("can't get user emails for mass mailing")
//       if (!data) return res.status(400).json({error: 'Auction not found'});
//       if (err) return err
//       req.list = data;
//       next();
//       })
// }


exports.sendUpdate = (req, res) => {
  //console.log(req.body)
  const transport = {
    //SEBA mail details 
    host: 'mail.gmx.com',
    port: 587,
    debug: false,
    auth: {
      user: id.user,
      pass: id.pass
    }
  };

  const transporter = nodemailer.createTransport(transport);


  transporter.verify((error, success) => {
    if (error) {
      alert(error)
    } else {
      console.log(req.body.list)
    }
  });

  const message = (product)=>{

    return(
  `<div> <h1>Hello,</h1><p>We are happy to announce that a new auciton has been added to page, do go check it out!</p> <big><b>Product Description : </b></big>  <ul><li><b>Item : </b>${req.body.data.title}</li><li><b>Description : </b>${product.description}</li><li><b>Price : € </b>${product.price}</li></ul> <a href="https://ibb.co/1nh5ZL5"><img src="https://i.ibb.co/YWYM23M/3.png" alt="3" border="0"></a></div>`
    );
  }
  const mail = {
    from: id.user,
    
    to: String(req.body.list),
    
    subject: 'A new item is live for auction.',
    text: `Hello, 
    We are happy to announce that a new auciton has been added to page, do go check it out!`,
    html: message(req.body.data)
    // template: 'index',
    // context: {
    //   name: 'Accime Esterling'
    // }// for addin addeitional fields
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: err+'FAIL'+req.body.list //userSubs()//mails(userSubs()) 
      })
      console.log(err)
    } else {
      res.json({
        status: req.body
      })
      console.log(req.body.data)
    }
  })
}