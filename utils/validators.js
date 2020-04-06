const { body } = require("express-validator/check");

exports.registerValidators = [
  body("email").isEmail().withMessage("Введите корректный email"),
  body("password", "Пороль должен быть миниум 6 символов")
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric(),
  body("confirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Пороли должны совпадать");
    }
    return true;
  }),
  body('name').isLength({min:3}).withMessage('Имя должно быть миниум три символа')
];
