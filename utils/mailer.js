const nodemailer = require('nodemailer');
const prisma = require('../db/db.config')
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.USER_PASS
    }
})

async function abandonCartEmail(){
    const items = line_items.map(i => `${i.title} - ${i.quantity}`);


    const mailOptions ={
    from: process.env.EMAIL_USER,
    to:email,
    subject: "You left items in your cart",
    text: `Hey! You left these items in your cart: 
    ${items}
    Complete your purchase before they're gone!`
    }
    await transporter.sendMail(mailOptions);
    console.log("mail sent to: " , to, " successfully!");
}