const docxPaths = {
    "1": "./Templates/Template1/BasicTemplate.docx",
    "2": "./Templates/Template2/LinkTemplate.docx",
    "3": "./Templates/Template3/ImageTemplate.docx"
  };
const resumeSuccessData= {
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
  module.exports = {
    docxPaths,resumeSuccessData
  };
  