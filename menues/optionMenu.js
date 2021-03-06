const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = {
  name: 'menu',
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows the menu for creating stats channels'),
  async execute (client, interaction, values) {
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('optionMenu')
        .setPlaceholder('Please select an option')
        .addOptions([
          {
            label: 'Member Count',
            description:
              'Creates a channel which shows the current number of members',
            value: 'memberCount'
          },
          {
            label: 'Member Goal',
            description:
              'Creates a channel which shows the current member goal',
            value: 'memberGoal'
          },
          {
            label: 'Online Members',
            description:
              'Creates a channel which shows (most) of the online members',
            value: 'onlineMembers'
          },
          {
            label: 'Creation Date',
            description:
              'Creates a channel which shows date the server was created',
            value: 'creationDate'
          }
        ])
    )

    await interaction.reply({
      content: 'These are the available options:',
      components: [row],
      ephemeral: true
    })
  }
}
