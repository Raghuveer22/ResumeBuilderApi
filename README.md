# Resume Generator API using AdobePdfServices SDK

This is a Node.js API with UI for users to interact and send a POST request for generating professional resumes using the AdobePdfServices SDK.

Website: The website for generating resumes is hosted at [Resume Builder](https://huggingface.co/spaces/Moki2004/ResumeBuilder). You can access the website to create professional resumes using a user-friendly interface. remember to give data exactly described in [constants.js](src/constants.js)

## File Structure

The file structure of the project is organized as follows:

```
├── __tests__
│   ├── resume-invalid-json.test.js
│   ├── resume-internal-server-error.test.js
│   ├── resume-success.test.js
│   ├── resume-template-not-found.test.js
│   └── resume-unauthorized.test.js
├── node_modules
├── public
│   ├── images
│   │   ├── BasicTemplatePhoto.jpg
│   │   ├── ImageTemplatePhoto.jpg
│   │   └── LinkTemplatePhoto.jpg
│   ├── script.js
│   └── styles.css
├── routers
│   ├── resume.js
│   └── views.js
├── src
│   ├── api-app.js
│   ├── constants.js
│   ├── pdf.js
│   ├── server.js
│   ├── validation.js
│   └── view-app.js
├── temp
├── Templates(Templates Data)
├── views
│   └── form.ejs
├── .gitignore
├── certificate_pub.crt
├── LICENSE
├── package-lock.json
├── package.json
├── pdfservices-api-credentials.json
├── private.key
└── README.md
```

## Setup

To set up the API, follow these steps:

1. Set up AdobePdfServices credentials by following the instructions in [Adobe's Document Generation API Quickstarts for Node.js](https://developer.adobe.com/document-services/docs/overview/document-generation-api/quickstarts/nodejs/).

2. Install the application's dependencies by running the command:

   ```shell
   npm i
   ```


3. Place the `pdfservices-api-credentials.json` file in the root folder of the project.
set the env variables

**Windows (CMD):**
```shell
set PDF_SERVICES_CLIENT_ID=<YOUR_CLIENT_ID>
set PDF_SERVICES_CLIENT_SECRET=<YOUR_CLIENT_SECRET>
```

**MacOS/Linux:**
```shell
export PDF_SERVICES_CLIENT_ID=<YOUR_CLIENT_ID>
export PDF_SERVICES_CLIENT_SECRET=<YOUR_CLIENT_SECRET>
```
.
## Technologies Used

The technologies used in this API are:

- Jest: A JavaScript testing framework.
- EJS: A templating engine for generating HTML markup with JavaScript.
- Express: A web application framework for Node.js.
- AdobePdfServices SDK: A software development kit for interacting with Adobe's PDF services.


## API Endpoints

The API provides the following endpoint:

- `POST /resume`: Generates a resume in PDF format based on the provided data.

## Usage

To use the API:

1. Start the API server by running the command:

   ```shell
   npm run dev
   ```

2. Send a POST request to `http://localhost:8080/resume` with the necessary data in the request body to generate a resume in PDF format and 
the user interface is hosted at `http://localhost:3000`


## Unit Testing

To run the unit tests and view the results, use the command:

```shell
npm test
```
Conducted unit tests over 77 cases and 5 test suites
## License

This project is licensed under the [MIT License](LICENSE).

Feel free to explore and modify the API according to your needs!

