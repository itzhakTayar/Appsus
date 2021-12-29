import { storageService } from "../../../services/storage.service.js";
import { utilsService } from "../../../services/util.service.js";

export const emailService = {
  getEmails: query,
  query,
};

const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus",
};
const DB = "emailDB";
const names = ["Izhak", "Noam", "Coding Acadmy", "ebay", "Netflix"];
var gEmails = [];
_createEmails();

function _createEmails() {
  if (gEmails.length) return;
  for (var i = 0; i < 5; i++) {
    var email = _createEmail(i);
    gEmails.push(email);
  }
}

function _createEmail(num) {
  const email = {
    id: utilsService.makeId(),
    subject: "Miss you!",
    body: "Would love to catch up sometimes",
    isRead: false,
    sentAt: 1551133930594,
    to: "momo@momo.com",
    shownName: names[num],
  };
  return email;
}

function query(search) {
  return gEmails;
}

function _saveEmailsToStorage() {
  storageService.saveToStorage(DB, gEmails);
}

function _loadEmailsFromStorage() {
  storageService.loadFromStorage(DB);
}
