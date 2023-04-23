import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import jsforce from "jsforce";

dotenv.config();

const databaseId = "FIXME";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function addItem(
  firstName: string,
  lastName: string,
  email: string,
  id: string
) {
  try {
    console.log("Starting the entry creation");
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        FirstName: {
          title: [
            {
              text: {
                content: firstName,
              },
            },
          ],
        },
        LastName: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: lastName,
              },
            },
          ],
        },
        Email: {
          email: email,
        },
        ID: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: id,
              },
            },
          ],
        },
      },
    });
    console.log(response);
    console.log("Success! Entry added.");
  } catch (error) {
    console.error("Entry addition failed: " + error);
  }
}

const username = "a.rymarchuk@job.com";
const password = process.env.SALESFORCE_PASSWORD;
const securityToken = process.env.SALESFORCE_TOKEN;

const loginUrl = "https://login.salesforce.com"; // or use https://test.salesforce.com for sandbox environment

const conn = new jsforce.Connection({ loginUrl });

async function subscribeToLeadUpdates(): Promise<void> {
  try {
    await conn.login(username, password || '' + securityToken);
    console.log("Logged in to Salesforce as: " + username);

    const channel = conn.streaming.topic("/topic/LeadChanges");
    channel.subscribe((message) => {
      console.log("Received message: " + JSON.stringify(message));
      const { sobject } = message;
      console.log(
        `New Lead created: ${sobject.FirstName} ${sobject.LastName} (${sobject.Email})`
      );
      addItem(String(sobject.FirstName), String(sobject.LastName), String(sobject.Email), String(sobject.Id));
    });
  } catch (err) {
    console.error("Salesforce login failed: " + err);
  }
}

subscribeToLeadUpdates();
