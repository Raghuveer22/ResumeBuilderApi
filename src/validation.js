const { error } = require("console");

function isLinkedInURL(link) {
  const regex = /^https?:\/\/(www\.)?linkedin\.com\/.*$/i;
  return regex.test(link);
}
function isValidPhoneNumber(phoneNumber) {
  const phoneNumberRegex = /^\+\d+$/; // Regex for +91 897888 format

  return phoneNumberRegex.test(phoneNumber);
}

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

  if (
    typeof personal_information !== 'object' ||
    !personal_information.name ||
    !personal_information.last_name ||
    !personal_information.email ||
    !personal_information.phone_number ||
    !personal_information.linkedin_url ||
    !isLinkedInURL(personal_information.linkedin_url)||
    isValidPhoneNumber(personal_information.phone_number)
  ) {
    return {
      error: 'personal_information must be an object with name, last_name, email, phone_number, and a valid LinkedIn URL'
    };
  }

  // Check if all personal_information fields are strings
  const personalInfoFields = ['name', 'last_name', 'email', 'phone_number', 'linkedin_url'];
  for (const field of personalInfoFields) {
    if (typeof personal_information[field] !== 'string') {
      return { error: `personal_information.${field} must be a string.` };
    }
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

  if (!Array.isArray(education) || !education.every(edu => validateEducation(edu))) {
    return {
      error: 'education must be an array of objects with school_name, passing_year, and description fields of valid types.'
    };
  }

  if (!Array.isArray(experience) || !experience.every(exp => validateExperience(exp))) {
    return {
      error: 'experience must be an array of objects with company_name, passing_year, and responsibilities fields of valid types.'
    };
  }

  if (!Array.isArray(achievements) || !achievements.every(ach => validateAchievement(ach))) {
    return {
      error: 'achievements must be an array of objects with field and awards fields of valid types.'
    };
  }

  return null; // No validation error
}

function validateEducation(edu) {
  if (
    typeof edu === 'object' &&
    edu.school_name &&
    edu.passing_year &&
    edu.description &&
    typeof edu.school_name === 'string' &&
    /^\d{4}-\d{4}$/.test(edu.passing_year) &&
    typeof edu.description === 'string'
  ) {
    return true;
  }
  return false;
}

function validateExperience(exp) {
  if (
    typeof exp === 'object' &&
    exp.company_name &&
    exp.passing_year &&
    exp.responsibilities &&
    typeof exp.company_name === 'string' &&
    /^\d{4}-\d{4}$/.test(exp.passing_year) &&
    typeof exp.responsibilities === 'string'
  ) {
    return true;
  }
  return false;
}

function validateAchievement(ach) {
  if (
    typeof ach === 'object' &&
    ach.field &&
    ach.awards &&
    typeof ach.field === 'string' &&
    typeof ach.awards === 'string'
  ) {
    return true;
  }
  return false;
}

function validateHeaders(req) {
  if (
    !req.headers['accept'] ||
    req.headers['accept'] !== 'application/pdf' ||
    !req.headers['content-type'] ||
    req.headers['content-type'] !== 'application/json'
  ) {
    return { error: 'Invalid headers' };
  }

  return null; // No validation error
}

module.exports = { validateFields, validateHeaders };
