import express from 'express';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../mongodb/models/user.js';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.js';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
	User.find({}).then((users) => {
		res.send({users});
	});
});

router.route('/getHighScores').get(async (req, res) => {
	const topPlayers = await User.find(
		{highScore: {$gt: 0}},
		{name: 1, highScore: 1}
	)
		.sort({highScore: -1}) // Sort in descending order by highScore
		.limit(5); // Limit the result to the top 5 players

	res.status(201).send({
		success: true,
		message: 'List of Top 5 players',
		result: topPlayers,
	});
});

router.route('/setHighScore').post((req, res) => {
	const {userId, highScore} = req.body;
	User.updateOne({_id: userId}, [
		{
			$set: {highScore},
		},
	])
		.then((result) => {
			if (!result.acknowledged)
				return res.status(201).send({
					success: false,
					message: 'Score not updated Successfully',
				});

			res.status(201).send({
				success: true,
				message: 'Score updated Successfully',
				result,
			});
		})
		.catch((error) => {
			res
				.status(500)
				.send({success: false, message: 'Error updating score', error});
		});
});

router.route('/register').post((req, res) => {
	const {name, email, password} = req.body;
	bcrypt
		.hash(password, 10)
		.then((hashedPassword) => {
			// create a new user instance new UserModel(
			const user = {
				name: name,
				email: email,
				password: hashedPassword,
			};

			User.create(user)
				.then((result) => {
					res.status(201).send({
						success: true,
						message: 'User created Successfully',
						result,
					});
				})
				.catch((error) => {
					res
						.status(500)
						.send({success: false, message: 'Error creating user', error});
				});
		})
		.catch((error) => {
			res.status(500).send({
				success: false,
				message: 'Password was not hashed successfully',
				error,
			});
		});
});

router.route('/login').post((req, res) => {
	const {email, password} = req.body;

	User.findOne({email: email})
		.then((user) => {
			bcrypt
				.compare(password, user.password)
				.then((passwordCheck) => {
					if (!passwordCheck) {
						return res.status(400).send({
							success: false,
							message: 'Password does not match',
						});
					}

					const token = jwt.sign(
						{
							userId: user._id,
							userEmail: user.email,
						},
						process.env.JWT_TOKEN_KEY,
						{expiresIn: '24h'}
					);

					res
						.cookie('JWT_TOKEN', token, {
							httpOnly: true,
							domain: 'localhost', // Set the domain to 'localhost'
							path: '/', // Set the path to the root ('/')
							secure: false, // Disable secure flag for development over HTTP
						})
						.status(200)
						.send({
							success: true,
							userId: user._id,
							email: user.email,
							name: user.name,
							//token,
							highScore: user.highScore,
							message: 'Login successful',
						});
				})
				.catch((error) => {
					console.log('catch ', error);
					res.status(400).send({
						success: false,
						message: 'Passwords does not match',
					});
				});
		})
		.catch((error) => {
			console.log('ERror');
			res.status(404).send({
				success: false,
				message: 'Email not found',
				error,
			});
		});
});

export default router;
