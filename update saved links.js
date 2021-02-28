const fs = require("fs");

let textLinks = [];

if (fs.existsSync("links.txt")) {
  textLinks = fs.readFileSync("links.txt", "utf8").split("\r\n");
}
let savedData = [];

if (fs.existsSync("links.json")) {
  savedData = require("./links.json");
}

const rules = [
  ".+/search/?.+",
  "https://about.reddit.com/.*",
  "^https://www.reddit.com/$",
  ".+/r/\\w+?/$",
  "^https://www.reddit.com/user/SuryaXanden/.*$",
  "^https://www.reddit.com/user/.*$",
  "^https://www.reddit.com/settings/profile$",
  "^https://www.reddit.com/mobile/download$",
  "^https://www.reddit.com/coins$",
  "^https://www.reddit.com/premium$",
  "^https://www.reddit.com/help/privacypolicy$",
  "^https://www.reddit.com/help/healthycommunities/$",
  "^http://www.redditblog.com/$",
  "^https://redditgifts.com/$",
  "^https://www.reddithelp.com/$",
  "^https://www.redditinc.com/advertising$",
  "^https://www.redditinc.com/policies/user-agreement$",
  "^https://www.redditinc.com/policies/content-policy$",
  "^https://www.reddit.com/rpan/$",
  "^https://www.reddit.com/chat$",
  "^https://www.reddit.com/message/inbox$",
];

let useful = [];

for (let link of textLinks) {
  for (let rule of rules) {
    link = link.replace(new RegExp(rule, "g"), "");
  }
  if (link) {
    useful.push(link);
  }
}

savedData = [...new Set([...savedData, ...useful])];

fs.writeFileSync("links.json", JSON.stringify(savedData, null, "\t"));
