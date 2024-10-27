![image](https://github.com/user-attachments/assets/4f87ea77-a0b3-4706-b304-f2249655f4b4)

*This project was a hackathon submission for Huddle Hive's Jump Start Hackathon.*

## Who are we?

We are Hacker Pirates. We're a mix of technical and non-technical individuals from the data team at ezyVet. In this project Lily worked on the design, with Vanu supporting on design plus building our presentation deck. Ana and Celine worked on the Github repo to prototype the integrations from a mock site to Github for creating the startup project at a click of a button.

## QuickStart

Our project is a submission to the HackathonParty challenge in 'creating a tool or utility that helps improve the hackathon experience'. QuickStart helps to resolve one of the biggest issues at hackathons - getting started.

QuickStart is a built-in tool for the HackathonParty workspace, supporting both technical and non-technical hackers. When a user enters the QuickStart tab, they are prompted to chose a startup project type and a project name. This automatically creates a Github repo for them that defaults to a React project. Non-technical hackers are able to drag and drop ideas of a prototype onto the page, simulating their project plan without needing to touch code. 

In the meantime, these changes are pushed to the Github repo regularly, allowing the technical individuals to pick up the repo and make further development changes to it. When the team are ready to start making their mockup of the product and user flow, they can click to create a Figma page which is autopopulated with a template related to their selection in an earlier step with a startup project type. 

The team is then able to develop and mock their product easily and smoothly, without having to spend hours getting the environment set up for the team and fighting to get their frontend and backend connected. When you have less than 12 hours to develop a project for a hackathon, every moment counts.

## Design

Our design followed the HackathonParty style, since it would be integrated in the site itself.

![image](https://github.com/user-attachments/assets/bdf530fe-45aa-498a-a99c-f4a01383bf27)

## Running QuickStack

If you want to try this out for yourself, here's what you will need to do:

1. Clone this repo to your local machine
2. Get your Github token
     - Go to Settings > Developer Settings > Personal access tokens > Tokens (classic)
     - Click 'generate new token (classic)' and fill in the required fields
     - We suggest you set this token to expire in 7 days (if you need it for longer then adjust for the minimum time needed)
     - We are still determining exactly what scope is required but the app should only need permissions to repo and write permissions
3. Now that you have your token, go to the backend folder in the repo you've cloned and create a .env file
4. Add your token to the .env file (don't include spaces, it should look like this -> TOKEN=yourtockenhere)
5. To try this yourself you will have to create an OAuth app for the client_id and client_session
6. Generate a session_secret (this can be anything) and add these three variables to the .env file
7. Run the backend with `cd quick-stack-backend/ && node server.js`
8. Run the frontend with `cd quick-stack-frontend/ && npm start`
9. Have fun!

## Tech Stack

The project was built with the following list of technologies:

Frontend: React, Bootstrap, Axios, CORS
Middleware: Axios, CORS
Backend: NodeJS, Express, cookie-session

## Accomplishments

We're a team of colleagues so after our long work week it's admirable that we were all able to come together to build on a project in less than 12 hours. This project required skill sets that many of us had not used in a long time, due to the nature of this full-stack development project and given that we are all from our company's data team!

Ironically, getting the project started up in the first place took over an hour with only one of us being able to access VSCode and Github to push changes to the repo. Developing this prototype together with only one IDE & Git being used was a challenge but we made it. We also couldn't use the access tokens returned by Github in the POST request so we had to prototype the project with a token created from Github settings and set in the .env file.
