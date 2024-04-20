const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const PORT = 3000
const dataBase = {
	g7f0pe: {
		text: 'Computer science',
		image: 'cs.jpg',
		final: false,
	},
	p0h1b8: {
		text: 'oreilly',
		image: 'oreilly.jpg',
		final: false,
	},
	f2h4b2: {
		text: 'spotify',
		image: 'spotify.jpg',
		final: true,
	},
}

app.use(express.json())
app.use('/images', express.static('images'))
app.get('/', (req, res) => {
	const code = req.body.code
	if (!dataBase[code]) {
		res.status(404)
		res.json({ error: 'Wrong code' })
		return
	}
	const now = new Date()
	if (
		!(
			(now.getHours() >= 8 && now.getHours() < 15) ||
			(now.getHours() == 15 && now.getMinutes() <= 30)
		)
	) {
		res.status(418)
		res.json({ error: 'Time is up' })
		return
	}
	const place = dataBase[code]
	place.image = `/images/${place.image}`
	res.json(place)
})
app.listen(PORT, () => {
	console.log('Server listening on ' + PORT)
})
