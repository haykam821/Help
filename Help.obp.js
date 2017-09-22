var doc = require('./../exports.js').config;

exports.collectHelp = function() {
  require('./../exports.js').registerCmd(['help'], 'Returns the list of commands that Onebot can use.');
  require('./../exports.js').registerCmd(['purgehelp'], 'Clears the list of commands that Onebot can use.');
}

exports.onMessageReceived = (function Version(bot, doc, user, userID, channelID, message, event) {

  if (message === undefined) {
    return;
  }
  if (message === doc.prefix + "purgehelp") {
    require('./../exports.js').syntaxes = [""];
    require('./../exports.js').descriptions = [""];
  }
  if (message === doc.prefix + "help") {
    var list1 = require('./../exports.js').syntaxes;
    var list2 = require('./../exports.js').descriptions;
    var stringList = "";
    for (var i = 1; i < list1.length; i++) {
      stringList += `${doc.prefix === '*' ? '-' : '*'} ${doc.prefix + list1[i]}: ${list2[i]}\n`;
    };
    console.log(stringList)
    var serverCount = stringList.split(/\r\n|\r|\n/).length - 1;
    var rating = serverCount > 14 ? "!" : "."
    bot.sendMessage({
      to: doc.logchannel,
      message: `<@${userID}> checked for all commands (currently ${serverCount}) the bot can use.`
    });
    bot.sendMessage({
      to: channelID,
      message: `Here are my commands:\n\`\`\`${stringList}\`\`\`\n I have ${serverCount} commands in total${rating}`
    });
  }
});
