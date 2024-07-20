const Joi = require('joi');
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;
const Meeting = require('../../models/meeting')
const nodemailer = require('nodemailer')
const Course = require('../../models/course')
const APP_PASSWORD = require('../../config/index')



let transporter = nodemailer.createTransport({
  service: 'gmail', // Use 'gmail' for Gmail or specify SMTP server details
  auth: {
    user: 'chusmanmunir786@gmail.com', // Your email address
    pass: 'lywq erff aqhc asgr'  // Your email password or app password
  }
});

async function sendEmail(to, subject, text, html) {
  let mailOptions = {
    from: 'chusmanmunir786@gmail.com', // Sender address
    to: to, // List of receivers
    subject: subject, // Subject line
    text: text, // Plain text body
    html: html // HTML body
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ' + error);
  }
}

async function handleMeetingRequest(req, res, next) {

  const sender = req.user._id;

  const { student_id, date , course_id } = req.body
  const Schema = Joi.object({
    student_id: Joi.string().regex(mongoDbIdPattern).required(),
    date: Joi.date().iso().required(),
    course_id:Joi.string().regex(mongoDbIdPattern).required(),
  })
  const { error } = Schema.validate(req.body);
  if (error) {
    return next(error)
  }


  const link = `V.konnectiq.ca/${Date.now()}`;
  
  let course
  
  try {
    course = await Course.findOne({_id:course_id})
  }
  catch (error) {
    return next(error)
  }


  const detail = `Teacher name : ${req.user.Fname} ${req.user.Lname}
  course: ${course.name}
  `

  // send to student via email 

  sendEmail(
    'usmanmunir986@gmail.com',
    'meeting link',
    'Hello, this is a meeting link',
    `<b>Hello,</b><br>Join meeting through given link: <a href="${link}">${link} ${detail}</a>`
  );



  const newMeeting = new Meeting({
    sender,
    receiver: student_id,
    link,
    date
  });

  try {
    await newMeeting.save();
  }
  catch (error) {
    return next(error);
  }

  return res.status(201).json({ message: 'Meeting link generated', link });

}



module.exports = {
  handleMeetingRequest
}