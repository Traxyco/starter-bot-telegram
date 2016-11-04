# Tutorial integration Telegram to Recast.AI bot

* This is a small Tutorial to show you how to integrate Telegram to a Recast.AI bot
* If you have no idea of how to use Recast.AI I advise you to check this SDK first:  [Recast.AI-nodejs-SDK](https://github.com/RecastAI/SDK-NodeJs)

## Requirements
* Create an account on [Recast.AI](https://recast.ai/signup)
* Download Telegram on your phone
* Configure your account on your phone
* Advise you to download [Telegram](https://desktop.telegram.org/) for a better dev exprience

## Set up your Recast.AI account

##### Create your bot

* Log in to your Recast.AI account
* Create a new bot

##### Get your token

* In your profile, click your bot
* In the tab-menu, click on the the little screw
* Here is the `request access token` you will need to configure your bot!

## Set up your Telegram account

##### Set the Telegram-bot

* Log in to your Telegram application on your (phone/desktop)
* Start a conversation with BotFather and say /newbot
* Follow the few step to create your bot
* Copy the token BotFather give you

## Start your bot in local
```bash
git clone https://github.com/RecastAI/bot-telegram.git
```

##### Complete the config.js

* Copy your Recast.AI `Recsat.AI access token`
* Copy your Telegram token `Token of your BOt`

```vim config.js```
```javascript
let config = {}
config.recast = {}
config.recast.request_token = 'RECAST-TOKEN'
config.recast.language = 'en' // to chose your language 'fr' or 'en'
config.telegram = {}
config.telegram.token = 'TELEGRAM-TOKEN'

module.exports = config
```
## Launching your Bot
```
npm install
npm start
```

### Your bot
* All you need for you bot is in the bot.js file. The call to Recast.AI is already done.
* ```client.textConverse(msg.text, { conversationToken: chatid })``` To use this method you need to pass the user's input, and  a unique conversation token. This token can be the message.chatid of the messenger chat. This token will create for each users a specific conversation with your bot.
* ```res.reply()``` To get the first reply of your bot.
* ```res.replies``` To get an array of all your replies.
* ``` res.action``` Get the object action. When an action is complete you will have the ```action.done = true ``` and you will be able to trigger a specific behavior.

```javascript
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
```

## Author

Henri Floren, henri.floren@recast.ai

You can follow us on Twitter at [@recastai](https://twitter.com/recastai) for updates and releases.

## License

Copyright (c) [2016] [Recast.AI](https://recast.ai)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

