const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
const fs = require('fs');
const { docxPaths } = require('./constants');
const { v4: uuidv4 } = require('uuid');

// Function to generate the resume in PDF format
function getData(data)
{
    const {
        template_id,
        personal_information,
        job_title,
        career_objective,
        skills,
        education,
        experience,
        achievements
    } = data;
    user_data = {
        "Name": personal_information.name,
        "LastName": personal_information.last_name,
        "EmailAddress": personal_information.email_address,
        "PhoneNumber": personal_information.phone_number,
        "LinkedIn": `<a href="${personal_information.linkedin_url}">LinkedIn</a>`,
        "JobTitle": job_title,
        "Summary": career_objective,
        "Skills": skills,
        "Education": education.map(edu => ({
            "SchoolName": edu.school_name,
            "Year": edu.passing_year,
            "Description": edu.description
        })),
        "Experience": experience.map(exp => ({
            "CompanyName": exp.company_name,
            "Year": exp.passing_year,
            "Description": exp.responsibilities
        })),
        "Achievements": achievements.map(ach => ({
            "Type": ach.field,
            "Description": ach.awards
        }))
        };
    return {template_id,user_data};
}
function generatePDF(data) {
  
  const {template_id,user_data}=getData(data);
  const input_file = docxPaths[template_id];

  return new Promise((resolve, reject) => {
    const outputFileName = `resume_${user_data.Name}_${user_data.LastName}.pdf`;
    const OUTPUT = `./temp/${outputFileName}`;
    const credentials = PDFServicesSdk.Credentials
      .servicePrincipalCredentialsBuilder()
      .withClientId("85c8c729f8a64332abd236589f997b2b")
      .withClientSecret("p8e-C4FxbvRivH-OIq2OLeBDLsCF96nVFHQq")
      .build();
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);
    const documentMerge = PDFServicesSdk.DocumentMerge;
    const documentMergeOptions = documentMerge.options;

    const options = new documentMergeOptions.DocumentMergeOptions(user_data, documentMergeOptions.OutputFormat.PDF);

    const documentMergeOperation = documentMerge.Operation.createNew(options);
    const input = PDFServicesSdk.FileRef.createFromLocalFile(input_file);
    documentMergeOperation.setInput(input);
    documentMergeOperation.execute(executionContext)
      .then(result => result.saveAsFile(OUTPUT))
      .then(() => resolve(OUTPUT))
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  generatePDF
};
