import { storageService } from "../../../services/storage.service.js";
import { utilsService } from "../../../services/util.service.js";

export const emailService = {
  query,
  addEmail,
};

const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Noam Shir",
};
const DB = "emailDB";
const names = ["Izhak", "Noam", "Coding Acadmy", "ebay", "Netflix"];
var gEmails = [];
_createEmails();

function _createEmails() {
  var emails = _loadEmailsFromStorage();
  if (!emails) {
    gEmails = [];
    for (var i = 0; i < 5; i++) {
      var email = _createEmail(i);
      gEmails.push(email);
    }
    _saveEmailsToStorage();
    return;
  }
  gEmails = emails;
}

function _createEmail(num) {
  const email = {
    id: utilsService.makeId(),
    subject: "Miss you!",
    body: "Would love to catch up sometimes",
    isRead: false,
    sentAt: Date.now(),
    to: loggedinUser.email,
    fromEmail: "poko@gmail.com",
    fromName: names[num],
  };
  return email;
}

function query(filterBy = null, sortBy = null) {
  if (!filterBy) return gEmails;
  var emails = getEmailsByFilter(filterBy);
  if (filterBy.search) emails = filterBySearch(emails, filterBy.search);
  return emails;
}

function getEmailsByFilter(filterBy) {
  if (filterBy.sent) {
    var emails = gEmails.filter((email) => {
      return email.fromEmail === loggedinUser.email;
    });
    return emails;
  }
  if (!filterBy.sent) {
    var emails = gEmails.filter((email) => {
      return email.to === loggedinUser.email;
    });
    return emails;
  }
}

function filterBySearch(emails, searchKey) {
  var filtered = emails.filter((email) => {
    return email.fromName.toUpperCase().includes(searchKey.toUpperCase());
  });
  return filtered;
}

function addEmail(newEmail) {
  var email = {};
  email.id = utilsService.makeId();
  email.subject = newEmail.titleInput;
  email.body = newEmail.msgInput;
  email.isRead = false;
  email.sentAt = Date.now();
  email.to = newEmail.toInput;
  email.fromEmail = loggedinUser.email;
  email.fromName = loggedinUser.fullname;
  gEmails.push(email);
  _saveEmailsToStorage();
  return Promise.resolve();
}

function _saveEmailsToStorage() {
  storageService.saveToStorage(DB, gEmails);
}

function _loadEmailsFromStorage() {
  var emails = storageService.loadFromStorage(DB);
  return emails;
}
