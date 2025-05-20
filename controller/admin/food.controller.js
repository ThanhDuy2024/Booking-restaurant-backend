export const foodCreateController = (req, res) => {
	console.log(req.body);
	res.status(200).json({
		code: "ok",
	})
}