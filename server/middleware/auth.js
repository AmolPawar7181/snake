import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
	const token = req.cookies.JWT_TOKEN;
	console.log('token ', token);
	if (!token) {
		return res.sendStatus(403);
	}
	try {
		const data = jwt.verify(token, process.env.JWT_TOKEN_KEY);
		return next();
	} catch {
		return res.sendStatus(403);
	}
};

export default auth;
