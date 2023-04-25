# Salesforce-to-Notion integration

  This small integration will allow you to have all the new Leads from your Salesforce org in your Notion database in a matter of a second! 
  [![Watch the video](https://img.youtube.com/vi/kWF7QR4TrkU/hqdefault.jpg)](https://youtu.be/kWF7QR4TrkU)

## Features

- TypeScript for type checking.
- [Prettier](https://prettier.io/) for code formatting.
- A minimal GitHub Actions workflow that typechecks your code.
- [Dotenv](https://www.npmjs.com/package/dotenv) for configuring your Notion API token.
- [Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuring-dependabot-version-updates)
  for ensuring your (and this repos) dependencies are up to date.
- Lovely Notion SDK!
- jsforce to subscribe to a Salesforce Streaming API.

## What to do after duplicating

1. Make sure you've [created a Notion integration](https://developers.notion.com/docs/getting-started) and have a secret Notion token.
2. Make sure you've an Apex trigger or PushTopic in your Salesforce org enabled and setted up to fire when a new Lead is created.
3. Add your Notion token to a `.env` file at the root of this repository: `echo "NOTION_TOKEN=[your token here]" > .env`
  (don't forget to add salesforce password and token too).
4. Run `npm install`.
5. Edit the `database_id` in `index.ts` from FIXME to be any database currently shared with your integration.
6. Run `npm start` to run the script.

## NPM Scripts

This template has a few built-in NPM scripts:

| Script              | Action                                                                                                                                                                          |
| - | - |
| `npm start`         | Run `index.ts`.                                                                                                                                                                 |
| `npm run typecheck` | Type check using the TypeScript compiler.                                                                                                                                       |
| `npm run format`    | Format using Prettier (also recommended: the [Prettier VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) if you're using VS code.) |
| `npm run build`     | Build JavaScript into the `dist/` directory. You normally shouldn't need this if you're using `npm start`.                                                                      |
