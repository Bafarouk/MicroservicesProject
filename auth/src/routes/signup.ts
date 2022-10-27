import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 5, max: 20 })
      .withMessage('Password must be between 5 and 20 characters'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new Error('invalid email or password');
    }

    console.log('creqting a user...');
    throw new Error('Lost connection with database');

    res.send({});
  }
);

export { router as signupRouter };
