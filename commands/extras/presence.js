require('module-alias/register')
const { client } = require('@root/index.js')

const listOfActivities = [
    "Hello",
    "Hi",
    "Hello World"
]
// s

for (const activity of listOfActivities) {
client.user.setActivity(activity, {
    type: "PLAYING",
})
}
