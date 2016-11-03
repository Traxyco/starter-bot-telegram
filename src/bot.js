import { Client } from 'recastai'
import TelegramBot from 'node-telegram-bot-api'
import config from './../config.js'

const client = new Client(config.recast.token, config.recast.language)
const bot = new TelegramBot(config.telegram.token, { polling: true })

bot.on('message', msg => {
  const chatId = msg.chat.id
  client.textConverse(msg.text, { conversationToken: chatId }).then((res) => {
    const reply = res.reply()               /* To get the first reply of your bot. */
    const replies = res.replies             /* An array of all your replies */
    const action = res.action               /* Get the object action. You can use 'action.done' to trigger a specification action when it's at true. */

    if (!reply || !replies) {
      bot.sendMessage('i don\'t get it :(')
    } else {
      if (action && action.done === true) {
        console.log('action is done')
        // Use external services: use res.memory('notion') if you got a notion from this action
      }
      replies.forEach(rep => bot.sendMessage(chatId, rep))
    }
  })
})
