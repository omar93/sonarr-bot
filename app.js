import Discord, { Intents } from 'discord.js'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.static('public'))

const client = new Discord.Client({intents: [Intents.FLAGS.GUILDS]})
let chatChannel = process.env.channel 
let channel = ''
let imdb = 'https://www.imdb.com/title/'

client.login(process.env.client_token )


app.post('/', async (req, res) => {
	try {
		let data = req.body
		channel = channel === '' ? await getChannel() : channel
		const embedMessageData = {
			title: data.series.title,
			url: imdb+data.series.imdbId,
			fields: [
				{
					name: 'Season',
					value: `${data.episodes[0].seasonNumber}`,
					inline:true
				},
				{
					name: 'Episode',
					value: `${data.episodes[0].episodeNumber}`,
					inline:true
				},
				{
					name: 'Title',
					value: `${data.episodes[0].title}`,
					inline:true
				},
				{
					name: 'Quality',
					value: `${data.release.quality}`,
					inline:true
				}
			]
		}
		channel.send({ embeds: [embedMessageData] })
		res.status(200).send('ok')
	} catch(error) {
			console.log('Discord ERROR')
			console.log(error)
	}

})

async function  getChannel() {
	return await client.channels.fetch(chatChannel)
}
  
app.listen(3000)