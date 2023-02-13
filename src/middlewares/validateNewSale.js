module.exports = (req, res, next) => {
  const { body } = req;
  const product = body.some(({ productId }) => !productId);
  const quant = body.some(({ quantity }) => quantity === undefined);
  if (product) return res.status(400).json({ message: '"productId" is required' });
  if (quant) return res.status(400).json({ message: '"quantity" is required' });
  return next();
};
