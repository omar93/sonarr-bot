import Discord, { Intents, MessageEmbed  } from 'discord.js'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

const client = new Discord.Client({intents: [Intents.FLAGS.GUILDS]})
let mainchat = '113408712395264000'
let channel = ''

app.get('/', function (req, res) {
	res.send('Hello World')
})


client.login(process.env.CLIENT_TOKEN)


app.post('/hook', async (req, res, next) => {
	let data = req.body

	channel = channel === '' ? await getChannel() : channel

	let embed = new MessageEmbed()
	.setTitle(data.series.title)
	.addField('Title: ', data.series.title)
	.addField('\nSeason: ', `${data.episodes[0].seasonNumber}`)
	.addField('Episode: ', `${data.episodes[0].episodeNumber}`)
	.addField('Quality: ', data.release.quality)
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')

    channel.send({ embeds: [embed] })

	res.status(200).send('ok')
})

async function  getChannel() {
	return await client.channels.fetch(mainchat)
}
  
app.listen(3000)