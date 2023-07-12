const supertest = require("supertest");
const app = require("../../src/api-app");
const { expect } = require("@jest/globals");
const {resumeSuccessData,resumeFieldTypes,personalInformationFieldTypes,educationFieldTypes}=require('../../src/constants');
const resumeFieldKeys = Object.keys(resumeFieldTypes);
const personalInformationFieldKeys = Object.keys(personalInformationFieldTypes);
const server = app.listen(0, () => {
  const port = server.address().port;
  console.log(`Server started on port ${port}`);
});
function excludeParameter(data, paramName) {
  const newData = { ...data };
  delete newData[paramName];
  return newData;
}

describe("Posting empty data", () => {
  // empty data
  test("should respond with a 400 status code", async () => {
    const data = {};
    const response = await supertest(app)
      .post("/resume")
      .set("Accept", "application/pdf")
      .set("Content-Type", "application/json")
      .send(data);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ error: 'Bad Request' });
  }, 30000);
});

// posting different with missing required fields
describe("POST with missing required fields",()=>{
  for (const field of resumeFieldKeys) {
    test(`${field} missing so it needs to respond with 400`, async () => {
      const paramName = field;
      const data = excludeParameter(resumeSuccessData, paramName);
      const response = await supertest(app)
        .post("/resume")
        .set("Accept", "application/pdf")
        .set("Content-Type", "application/json")
        .send(data);
      expect(response.status).toEqual(400);
      expect(response.body).toEqual({ error: 'Bad Request' });
    }, 30000);
  }

});


describe("POST with invalid data types fields", () => {
  // for all fie;lds

  for (const field of resumeFieldKeys) {
    test(`${field} data type is string so giving it a wrong datatype and checking it to `, async () => {
      const data=resumeSuccessData;
      data[field]=12222;
      const response = await supertest(app)
      .post("/resume")
        .set("Accept", "application/pdf")
        .set("Content-Type", "application/json")
        .send(data);
        expect(response.status).toEqual(400);
      expect(response.body).toEqual({ error: 'Bad Request' });
    }, 30000);
}
 
});
//
describe("POST with missing fields in personal Information", () => {
  // for all fields
  for (const field of personalInformationFieldKeys) {
    test(`${field} data type is string so giving it a wrong datatype and checking it to `, async () => {
      const data=resumeSuccessData;
      const paramName = field;
      data.personal_information = excludeParameter(resumeSuccessData.personal_information, paramName);
      const response = await supertest(app)
      .post("/resume")
        .set("Accept", "application/pdf")
        .set("Content-Type", "application/json")
        .send(data);
        expect(response.status).toEqual(400);
      expect(response.body).toEqual({ error: 'Bad Request' });
    }, 30000);
}
});

describe("POST with wrong data fields in personal Information", () => {
  // for all fields
  for (const field of personalInformationFieldKeys) {
    test(`${field} data type is string so giving it a wrong datatype and checking it to `, async () => {
      data=resumeSuccessData;
      data.personal_information.field=12222;
      const response = await supertest(app)
      .post("/resume")
        .set("Accept", "application/pdf")
        .set("Content-Type", "application/json")
        .send(data);
        expect(response.status).toEqual(400);
      expect(response.body).toEqual({ error: 'Bad Request' });
    }, 30000);
}
});

describe("POST adding objects instead of arrays", () => {
  // for all fields
  for (const field in resumeFieldTypes) {
    if(resumeFieldTypes[field]==="array")
    {
      test(`${field} data type is string so giving it a wrong datatype and checking it to `, async () => {
        data=resumeSuccessData;
      data[field]=data[field][0];
      console.log("helleo")
      const response = await supertest(app)
      .post("/resume")
        .set("Accept", "application/pdf")
        .set("Content-Type", "application/json")
        .send(data);
        expect(response.status).toEqual(400);
        expect(response.body).toEqual({ error: 'Bad Request' });
      }, 30000);
    }
    }
});

describe("POST adding objects instead of arrays", () => {
  // for all fields
  for (const field in resumeFieldTypes) {
    if(resumeFieldTypes[field]==="array")
    {
      test(`${field} data type is string so giving it a wrong datatype and checking it to `, async () => {
        data=resumeSuccessData;
      data[field]=data[field][0];
      console.log("helleo")
      const response = await supertest(app)
      .post("/resume")
        .set("Accept", "application/pdf")
        .set("Content-Type", "application/json")
        .send(data);
        expect(response.status).toEqual(400);
        expect(response.body).toEqual({ error: 'Bad Request' });
      }, 30000);
    }
    }
});

