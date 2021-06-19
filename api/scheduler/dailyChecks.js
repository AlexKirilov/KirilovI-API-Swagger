import * as schedule from "node-schedule";
import Auth from '../models/Auth.js';
import { sendMail, fromEmail } from '../mailer/sendMail.js';

const authDaysExpTime = 3; // Days
const authMonthsExpTime = 5; // Months
const returnOnlyDetails = 'email lastLogin';
// For more details visit the link: https://www.npmjs.com/package/node-schedule
const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.tz = 'Europe/London';

export function runDaily() {
  const job = schedule.scheduleJob(rule, function () {
    console.log('Daily check was triggered!');
    checkAllOwnersForLastLoginDate();
  });
}

// Available only from Super Admin
export async function getAuthExpInRange(startDate, endDate) {
  const by = {
    lastLogin: {
      $gte: startDate,
      $lte: endDate
    }
  };

  return await Auth.find(by);
}

function sendEmailsToEachEmailInTheList(list) {
  const unSendedList = [];
  const sendedTo = []; // to ensure all emails are send correctly;
  // TODO: sendMail Error ---> Retry and log the error on all places where is used
  list.forEach(acc => {
    sendMail('expiringAccount', acc.email, URI,
      (msg) => sendedTo.push(acc),
      (err) => unSendedList.push(acc)
    )
  });

  return (sendedTo.length === list.length) ? true : unSendedList;
}

// Available only from Super Admin
async function getAuthExpInMonth(months) {
  const date = new Date();
  date.setMonth(new Date(date.getMonth() - months));
  const endDate = new Date(date);
  endDate.setDate(date.getDate() + 1);

  const by = {
    lastLogin: {
      $gte: date,
      $lte: endDate
    }
  };

  return await Auth.find(by).select(returnOnlyDetails);
}

// Available only from Super Admin
async function getAuthExpInDays(days) {
  const date = new Date();
  date.setMonth(new Date(date.getDate() - days));
  const endDate = new Date(date);
  endDate.setDate(date.getDate() + 1);

  const by = {
    lastLogin: {
      $gte: date,
      $lte: endDate
    }
  };

  return await Auth.find(by).select(returnOnlyDetails);
}

async function checkAllOwnersForLastLoginDate() {
  const inDaysTime = await getAuthExpInDays(authDaysExpTime);
  const inMonthTime = await getAuthExpInMonth(authMonthsExpTime);

  if (inDaysTime && inDaysTime.length > 0) {
    const isSend = sendEmailsToEachEmailInTheList(inDaysTime);
    if (isSend && isSend.length > 0) {
      sendMail('unInformedUsersForExpiringAccounts', fromEmail, isSend)
    }
  }

  if (inMonthTime && inMonthTime.length > 0) {
    const isSend = sendEmailsToEachEmailInTheList(inMonthTime);
    if (isSend && isSend.length > 0) {
      sendMail('unInformedUsersForExpiringAccounts', fromEmail, isSend)
    }
  }
}