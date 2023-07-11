const express = require('express');
const apiRouter = express.Router();
const fs = require('fs'); // Add this line to import the fs module
const { validateFields, validateHeaders } = require('./validation');
const { generatePDF } = require('../src/pdf');
const { docxPaths } = require('../src/constants');

// POST route for generating a resume
apiRouter.post('/resume', async (req, res) => {
  const headersError = validateHeaders(req);
  if (headersError) {
    return res.status(401).json({ error: 'Unauthorised' });
  }

  const fieldsError = validateFields(req);
  if (fieldsError) {
    return res.status(400).json({ error: 'Bad Request' });
  }

  try {
    const {
      template_id,
      personal_information,
      job_title,
      career_objective,
      skills,
      education,
      experience,
      achievements
    } = req.body;
    if (!docxPaths.hasOwnProperty(template_id)) {
      return res.status(404).json({ error: 'Template not found' });
    }

    const outputPath = await generatePDF(req.body);
    const pdfContent = fs.readFileSync(outputPath);

    // Set the response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');

    // Send the PDF file as the response
    res.send(pdfContent);
    fs.unlinkSync(outputPath);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = apiRouter;