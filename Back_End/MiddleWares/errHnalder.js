/**
 * errorHanlder - Function Middle ware to handle the error
 */

const errorHanlder = (err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || 'Internal Server Error';

	return (res.status(statusCode).json({
		success: false,
		message: message,
	}));
}

export {errorHanlder}