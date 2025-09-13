const prisma = require('../db/db.config')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

exports.login = async (req, res) => {
  try {
    const { store_name, user_email } = req.body;

    const existingUser = await prisma.store.findFirst({
      where: { store_name, user_email }
    });

    if (!existingUser) {
      return res.status(404).json("User does not exist");
    }

    const token = jwt.sign({ id: existingUser.id }, secret, {
      expiresIn: "1h"
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000
    });

    return res.status(200).json({
      message: `Login successful for ${existingUser.user_email} !!`,
      user: {
        id: existingUser.id,
        store_name: existingUser.store_name,
        user_email: existingUser.user_email
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
