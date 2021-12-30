import { storageService } from "../../../services/storage.service.js";
import { utilsService } from "../../../services/util.service.js";

export const emailService = {
  query,
  addEmail,
  toggleIsRead,
  setEmailAsTrash,
  deleteEmail,
  getUnreadInboxCount,
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
    deletedAt: null,
  };
  return email;
}

function query(filterBy = null, sortBy = null) {
  if (!filterBy) return gEmails;
  var emails = _getEmailsByFilter(filterBy);
  if (filterBy.search) emails = _filterBySearch(emails, filterBy.search);
  return Promise.resolve(emails);
}

function _getEmailsByFilter(filterBy) {
  var emails = gEmails;
  if (filterBy.isRead === "true") {
    emails = emails.filter((email) => email.isRead);
  } else if (filterBy.isRead === "false") {
    emails = emails.filter((email) => !email.isRead);
  }
  if (!filterBy.trash) emails = emails.filter((email) => !email.deletedAt);

  if (filterBy.trash) emails = emails.filter((email) => email.deletedAt);
  if (filterBy.sent) {
    return emails.filter((email) => email.fromEmail === loggedinUser.email);
  }
  if (!filterBy.sent) {
    return emails.filter((email) => email.to === loggedinUser.email);
  }
}

function getUnreadInboxCount() {
  var emails = gEmails.filter(
    (email) =>
      email.to === loggedinUser.email && !email.isRead && !email.deletedAt
  );
  return emails.length;
}

function _filterBySearch(emails, searchKey) {
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
  email.deletedAt = null;
  gEmails.unshift(email);
  _saveEmailsToStorage();
  return Promise.resolve();
}

function deleteEmail(email) {
  var idx = getEmailIdxById(email.id);
  gEmails.splice(idx, 1);
  _saveEmailsToStorage();
  return Promise.resolve();
}

function toggleIsRead(email, onlyToOpen = false) {
  email.isRead = !email.isRead;
  if (onlyToOpen) email.isRead = true;
  _saveEmailsToStorage();
  return Promise.resolve();
}

function setEmailAsTrash(email) {
  email.deletedAt = Date.now();
  _saveEmailsToStorage();
  return Promise.resolve();
}

function getEmailIdxById(id) {
  var idx = gEmails.findIndex((email) => {
    return email.id === id;
  });
  return idx;
}

function _saveEmailsToStorage() {
  storageService.saveToStorage(DB, gEmails);
}

function _loadEmailsFromStorage() {
  var emails = storageService.loadFromStorage(DB);
  return emails;
}
