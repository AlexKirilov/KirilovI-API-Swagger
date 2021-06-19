import nodemailer from "nodemailer";
import {
  expiringAccount,
  confirmNewAccount,
  expiredVerificationLink,
  unInformedUsersForExpiringAccounts
} from "./mailTypeMessages.js";

export const fromEmail = `Kirilovi API <${process.env.MONGODB_USERNAME}>`;

const configs = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  requireTLS: true,
  auth: {
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
}

export async function sendMail(mailType, sendTo, props, callback = (s) => s, errorCallback = (e) => e) {

  // Create a SMTP transporter object
  const transporter = nodemailer.createTransport(configs);

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      errorCallback(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  // Message object
  const message = getMailDetails(sendTo, mailType, props);

  transporter.sendMail(message, (err, info) => {
    if (err) {
      errorCallback(err);
      return process.exit(1);
    }

    callback(`Message sent: ${info.messageId}`);
  });
};

function getMailDetails(sendTo, type, props) {
  const messageDetails = getEmailMessageByType(type, props);
  return {
    from: fromEmail,
    to: sendTo,
    subject: messageDetails.subject,
    text: messageDetails.text,
  };
}

function getEmailMessageByType(type, props) {
  switch (type) {
    case 'signUp': return confirmNewAccount(props); break;
    case 'expiringAccount': return expiringAccount(props); break;
    case 'expiredVerificationLink': return expiredVerificationLink(props); break;
    case 'unInformedUsersForExpiringAccounts' : return unInformedUsersForExpiringAccounts(props); break;
    default: { }
  }

}