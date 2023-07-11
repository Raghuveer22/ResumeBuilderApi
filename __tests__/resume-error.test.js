const supertest = require("supertest");
const app = require("../src/apiApp");
const fs = require('fs');
const { expect } = require("@jest/globals");

const server = app.listen(0, () => {
  const port = server.address().port;
  console.log(`Server started on port ${port}`);
});

jest.mock('../src/pdf', () => ({
    generatePDF: jest.fn().mockImplementation(() => {
      throw new Error('Internal Server Error');
    }),
  }));

describe("POST /resume", () => {
    test("should respond with a 500 status code", async () => {
        const data = {
          "template_id": "1",
          "personal_information": {
            "name": "Lorem",
            "last_name": "ipsum",
            "email_address": "ipsum@adobe.com",
            "phone_number": "+91 99xx14xx99",
            "linkedin_url": "https://www.linkedin.com"
          },
          "job_title": "Software Development Engineer",
          "career_objective": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper.",
          "skills": [
            "Strong interpersonal",
            "communication skills",
            "Leadership",
            "Poised under pressure"
          ],
          "education": [
            {
              "school_name": "School",
              "passing_year": "201X-201Y",
              "description": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by  injected humour, or randomised words which don't look even slightly believable."
            },
            {
              "school_name": "College",
              "passing_year": "203X-203Y",
              "description": "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc"
            }
          ],
          "experience": [
            {
              "company_name": "Adobe",
              "passing_year": "201X-201Y",
              "responsibilities": "It is a long established fact that a reader will be distracted by the readable content. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod"
            }
          ],
          "achievements": [
            {
              "field": "Academics",
              "awards": "Lorem ipsum dolor sit amet"
            },
            {
              "field": "Sports",
              "awards": "consectetuer adipiscing elit"
            }
          ]
        };
        const response = await supertest(app)
          .post("/resume")
          .set("Accept", "application/pdf")
          .set("Content-Type", "application/json")
          .send(data);
      
        expect(response.status).toEqual(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
      }, 30000);
    });