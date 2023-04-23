import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import jsforce from "jsforce";


// Loads .env file contents into process.env.
dotenv.config();


// Initialising a new notion client to be able to work conveniently with the API
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = "FIXME";

// I've moved a new item addition process into a separate func.
// so it will be easier to navigate throughout the code
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

// Replace all the process.env variables with your data
const username = process.env.SALESFORCE_USERNAME;
const password = process.env.SALESFORCE_PASSWORD;
const securityToken = process.env.SALESFORCE_TOKEN;

const loginUrl = "https://login.salesforce.com"; // or use https://test.salesforce.com for sandbox environment

const conn = new jsforce.Connection({ loginUrl });

async function subscribeToLeadUpdates(): Promise<void> {
  try {
    // We're using login method to, obviously, login into the salesforce
    await conn.login(username || '', password || '' + securityToken || '');
    console.log("Logged in to Salesforce as: " + username);

    // streaming method here used to establish connection with the streaming API
    const channel = conn.streaming.topic("/topic/LeadChanges");

    // Long story short - subscripe method used here to subscribe to the changes of a Lead object
    channel.subscribe((message) => {
      console.log("Received message: " + JSON.stringify(message));
      const { sobject } = message;
      console.log(
        `New Lead created: ${sobject.FirstName} ${sobject.LastName} (${sobject.Email})`
      );
      addItem(sobject.FirstName, sobject.LastName, sobject.Email, sobject.Id);
    });
  } catch (err) {
    console.error("Salesforce login failed: " + err);
  }
}

subscribeToLeadUpdates();
