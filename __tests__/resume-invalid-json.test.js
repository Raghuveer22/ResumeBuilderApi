const supertest = require("supertest");
const app = require("../src/api-app");
const { expect } = require("@jest/globals");
const { resumeSuccessData, resumeFieldTypes, personalInformationFieldTypes } = require('../src/constants');


const resumeFieldKeys = Object.keys(resumeFieldTypes);
const personalInformationFieldKeys = Object.keys(personalInformationFieldTypes);

const server = app.listen(0, () => {
  const port = server.address().port;
  console.log(`Server started on port ${port}`);
});

function excludeParameter(data, paramName) {
  const newData = JSON.parse(JSON.stringify(data));
  delete newData[paramName];
  return newData;
}

describe("POST /resume with empty data", () => {
  test("should respond with a 400 status code", async () => {
    const data = {};
    const response = await supertest(app)
      .post("/resume")
      .set("Accept", "application/pdf")
      .set("Content-Type", "application/json")
      .send(data);

    expect(response.status).toEqual(400);
  }, 30000);
});

describe("POST /resume with missing required fields", () => {
  for (const field of resumeFieldKeys) {
    test(`should respond with a 400 status code when ${field} is missing`, async () => {
      const paramName = field;
      const data = excludeParameter(resumeSuccessData, paramName);
      const response = await supertest(app)
        .post("/resume")
        .set("Accept", "application/pdf")
        .set("Content-Type", "application/json")
        .send(data);

      expect(response.status).toEqual(400);
    }, 30000);
  }
});

describe("POST /resume with invalid data types for fields", () => {
  for (const field of resumeFieldKeys) {
    test(`should respond with a 400 status code when ${field} has an invalid data type`, async () => {
      const data = JSON.parse(JSON.stringify(resumeSuccessData));
      data[field] = 12222;
      const response = await supertest(app)
        .post("/resume")
        .set("Accept", "application/pdf")
        .set("Content-Type", "application/json")
        .send(data);

      expect(response.status).toEqual(400);
    }, 30000);
  }
});

describe("POST /resume with missing fields in personal information", () => {
  for (const field of personalInformationFieldKeys) {
    test(`should respond with a 400 status code when ${field} is missing in personal information`, async () => {
      const data = JSON.parse(JSON.stringify(resumeSuccessData));
      const paramName = field;
      data.personal_information = excludeParameter(resumeSuccessData.personal_information, paramName);
      const response = await supertest(app)
        .post("/resume")
        .set("Accept", "application/pdf")
        .set("Content-Type", "application/json")
        .send(data);

      expect(response.status).toEqual(400);
    }, 30000);
  }
});

describe("POST /resume with wrong data types in personal information fields", () => {
  for (const field of personalInformationFieldKeys) {
    test(`should respond with a 400 status code when ${field} has an invalid data type in personal information`, async () => {
      const data = JSON.parse(JSON.stringify(resumeSuccessData));
      data.personal_information[field] = 12222;
      const response = await supertest(app)
        .post("/resume")
        .set("Accept", "application/pdf")
        .set("Content-Type", "application/json")
        .send(data);

      expect(response.status).toEqual(400);
    }, 30000);
  }
});

describe("POST /resume with objects instead of arrays", () => {
  for (const field in resumeFieldTypes) {
    if (resumeFieldTypes[field] === "array") {
      test(`should respond with a 400 status code when ${field} has an object instead of an array`, async () => {
        const data = JSON.parse(JSON.stringify(resumeSuccessData));
        data[field] = data[field][0];
        const response = await supertest(app)
          .post("/resume")
          .set("Accept", "application/pdf")
          .set("Content-Type", "application/json")
          .send(data);

        expect(response.status).toEqual(400);
      }, 30000);
    }
  }
});
