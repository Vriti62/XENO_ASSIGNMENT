const prisma = require('../db/db.config');
exports.onboardStore = async (req, res) => {
  try {
    const { store_name, user_email, webhook_secret } = req.body;

    const store = await prisma.store.upsert({
      where: { store_name },
      update: { user_email, webhook_secret },
      create: { store_name, user_email, webhook_secret }
    });

    res.json({ msg: "Store onboarded", store });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error onboarding store" });
  }
};
