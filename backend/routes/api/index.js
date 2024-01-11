// backend/routes/api/index.js
const router = require('express').Router();

// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');

router.use(restoreUser);



router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'User1'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

// GET /api/restore-user
router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

// GET /api/require-auth
router.get(
    '/require-auth',
    requireAuth,
    (req, res) => {
      return res.json(req.user);
    }
);

module.exports = router;