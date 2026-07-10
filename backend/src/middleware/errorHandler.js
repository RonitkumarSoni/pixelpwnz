const MAX_FILE_SIZE_MB = 50;

/**
 * Check if the error is a Multer file-size error and classify it.
 */
function classifyMulterError(err) {
  if (err.code === 'LIMIT_FILE_SIZE') {
    err.statusCode = 413;
    err.message = `File too large. Maximum ${MAX_FILE_SIZE_MB}MB.`;
  }
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    err.statusCode = 400;
    err.message = 'Invalid file field name. Use "chatFile".';
  }
  return err;
}

export default function errorHandler(err, _req, res, _next) {
  err = classifyMulterError(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (statusCode === 500) {
    console.error('[Error]', err);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
}
