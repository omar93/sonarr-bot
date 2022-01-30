import Discord, { Intents, MessageEmbed  } from 'discord.js'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.static('public'))

const client = new Discord.Client({intents: [Intents.FLAGS.GUILDS]})
let chatChannel = process.env.TV_SHOWS  
let channel = ''

app.get('/', function (req, res) {
	res.send('Hello World')
})

let test = 'http://www.google.com'
client.login(process.env.CLIENT_TOKEN)


app.post('/hook', async (req, res, next) => {

	try {
		let data = req.body
		console.log(data)
		channel = channel === '' ? await getChannel() : channel
	
		let embed = new MessageEmbed()

		const exampleEmbed = {
			/*
			author: {
				name: 'Sonarr',
				icon_url: 'https://styles.redditmedia.com/t5_345pm/styles/communityIcon_x5ngmsz1boz51.png',
				url: 'https://sonarr.tv/',
			},
			*/
			title: data.series.title,
			/*
			thumbnail: {
				url:'https://static.tvmaze.com/uploads/images/medium_portrait/392/982009.jpg'
			},
			*/
			url: process.env.imdb+data.series.imdbId,
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
				}/*,
				{
					name: 'Links:',
					value: `[IMDB](${test})`,
					inline:true
				}
*/
			]
			/*
			,
			image: {
				url : 'https://static.tvmaze.com/uploads/images/medium_portrait/392/982009.jpg'
			}
			
			,
			
			timestamp: new Date()
			*/
		}

		/*
		https://static.tvmaze.com/uploads/images/medium_portrait/392/982009.jpg - poster
		.setTitle(data.series.title)
		.addField('Title: ', data.series.title, true)
		.addField('\nSeason: ', `${data.episodes[0].seasonNumber}`)
		.addField('Episode: ', `${data.episodes[0].episodeNumber}`, true)
		.addField('Quality: ', data.release.quality, false)
		.setThumbnail('https://i.imgur.com/AfFp7pu.png')

						{
					name: '\u200b',
					value: '\u200b',
					inline: false,
				},

								{
					name: 'Quality',
					value: `${data.release.quality}`,
					inline:true
				},
				{
					name: '\u200b',
					value: '\u200b',
					inline: false,
				},

		*/
	
		channel.send({ embeds: [exampleEmbed] })
	
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