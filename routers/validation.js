const { error } = require("console");

function validateFields(req) {
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
  
    if (
      !template_id ||
      !personal_information ||
      !job_title ||
      !career_objective ||
      !skills ||
      !education ||
      !experience ||
      !achievements
    ) {
      return { error: 'Missing required fields' };
    }
  
    if (typeof template_id !== 'string') {
      return { error: 'template_id must be a string.' };
    }
    if(typeof personal_information!=='object' && personal_information.name && personal_information.last_name && personal_information.email && personal_information.phone_number &&personal_information.linkedin_url)
    {
      return {error: 'personal_information must be an object with name, last_name, email, phone_number and linkedin_url'};
    }
    if (typeof job_title !== 'string') {
      return { error: 'job_title must be a string.' };
    }
  
    if (typeof career_objective !== 'string') {
      return { error: 'career_objective must be a string.' };
    }
  
    if (!Array.isArray(skills) || !skills.every(skill => typeof skill === 'string')) {
      return { error: 'skills must be an array of strings.' };
    }
  
    if (!Array.isArray(education) || !education.every(edu => typeof edu === 'object' && edu.school_name && edu.passing_year && edu.description)) {
      return { error: 'education must be an array of objects with school_name, passing_year, and description fields.' };
    }
  
    if (!Array.isArray(experience) || !experience.every(exp => typeof exp === 'object' && exp.company_name && exp.passing_year && exp.responsibilities)) {
      return { error: 'experience must be an array of objects with company_name, passing_year, and responsibilities fields.' };
    }
  
    if (!Array.isArray(achievements) || !achievements.every(ach => typeof ach === 'object' && ach.field && ach.awards)) {
      return { error: 'achievements must be an array of objects with field and awards fields.' };
    }
  
    return null; // No validation error
  }
  
  function validateHeaders(req) {
    if (!req.headers['accept'] || req.headers['accept'] !== 'application/pdf' ||
        !req.headers['content-type'] || req.headers['content-type'] !== 'application/json') {
      return { error: 'Invalid headers' };
    }
  
    return null; // No validation error
  }
  
module.exports = { validateFields, validateHeaders };
  