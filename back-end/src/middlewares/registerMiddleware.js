function validateCreateUser(req, res, next) {
  const NAME_LENGTH = 12;
  const VERIFY_EMAIL = (testEmail) => /\S+@\S+\.\S+/.test(testEmail);
  const PASSWORD_LENGTH = 6;

  const { name, email, password } = req.body;

    if (name.length < NAME_LENGTH) {
      res.status(400).json({ message: 'Name has no length necessary' });
    } 
    if (!(VERIFY_EMAIL(email))) {
      res.status(400).json({ message: 'Email is not valid email' });
    } 
    if (password.length < PASSWORD_LENGTH) {
      res.status(400).json({ message: 'Password has no length necessary' });
    }
    next();
}

module.exports = {
  validateCreateUser,
};
