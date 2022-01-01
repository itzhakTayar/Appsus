import { storageService } from '../../../services/storage.service.js';
import { utilsService } from '../../../services/util.service.js';

export const emailService = {
  query,
  addEmail,
  toggleIsRead,
  setEmailAsTrash,
  deleteEmail,
  getUnreadInboxCount,
  toggleStarState,
  getEmailById,
  checkIfSent,
};

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Noam Shir',
};
const DB = 'emailDB';
const names = ['Izhak', 'Noam', 'Coding Acadmy', 'ebay', 'Netflix'];
var gEmails = [];
var gDrafts = [];
_createEmails();

function _createEmails() {
  var emails = _loadEmailsFromStorage();
  if (!emails) {
    gEmails = [
      {
        id: utilsService.makeId(),
        subject: 'Linkedin job alert',
        body: "5 new jobs for 'full-stuck developer'",
        isRead: false,
        sentAt: "2 day's ago",
        to: loggedinUser.email,
        fromEmail: 'jobalerts-noreply@linkedin.com',
        fromName: 'Linkedin',
        deletedAt: null,
        isStar: false,
      },
      {
        id: utilsService.makeId(),
        subject: "We've added a movie that might interest you",
        body: 'www.netflix.com/title/80198',
        isRead: false,
        sentAt: "3 week's ago",
        to: loggedinUser.email,
        fromEmail: 'info@mailer.netflix.com',
        fromName: 'Netflix',
        deletedAt: null,
        isStar: false,
      },
      {
        id: utilsService.makeId(),
        subject: 'Other users are buying these items',
        body: 'Get to know the products that everyone uses',
        isRead: false,
        sentAt: 'just now',
        to: loggedinUser.email,
        fromEmail: 'transaction@notice.aliexpress.com',
        fromName: 'Aliexpress',
        deletedAt: null,
        isStar: false,
      },
      {
        id: utilsService.makeId(),
        subject: '',
        body: 'Get to know the products that everyone uses',
        isRead: false,
        sentAt: 'just now',
        to: loggedinUser.email,
        fromEmail: 'transaction@notice.aliexpress.com',
        fromName: 'Aliexpress',
        deletedAt: null,
        isStar: false,
      },
      {
        id: utilsService.makeId(),
        subject: '',
        body: 'We are not happy with your code',
        isRead: false,
        sentAt: 'just now',
        to: loggedinUser.email,
        fromEmail: 'transaction@notice.aliexpress.com',
        fromName: 'Aliexpress',
        deletedAt: null,
        isStar: false,
      },
    ];
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
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: Date.now(),
    to: loggedinUser.email,
    fromEmail: 'poko@gmail.com',
    fromName: names[num],
    deletedAt: null,
    isStar: false,
  };
  return email;
}

function query(filterBy = null, sortBy = null) {
  if (!filterBy) return gEmails;
  var emails = _getEmailsByFilter(filterBy);
  if (filterBy.search) emails = _filterBySearch(emails, filterBy.search);
  if (sortBy) emails = sortEmails(emails, sortBy);
  return Promise.resolve(emails);
}

function sortEmails(emails, sortBy) {
  if (sortBy === 'Date') {
    emails.sort((e1, e2) => {
      return e1.sentAt > e2.sentAt;
    });
    return emails;
  }
  if (sortBy === 'Title') {
    emails.sort((e1, e2) => {
      var str1 = e1.subject.toUpperCase();
      var str2 = e2.subject.toUpperCase();
      if (str1 < str2) {
        return -1;
      }
      if (str1 > str2) {
        return 1;
      }
      return 0;
    });
    return emails;
  }
}

function _getEmailsByFilter(filterBy) {
  var emails = gEmails;
  if (filterBy.draft) {
    return emails.filter((email) => email.isDraft);
  }
  emails = emails.filter((email) => !email.isDraft);
  if (filterBy.isRead === 'true') {
    emails = emails.filter((email) => email.isRead);
  } else if (filterBy.isRead === 'false') {
    emails = emails.filter((email) => !email.isRead);
  }
  if (!filterBy.trash) emails = emails.filter((email) => !email.deletedAt);
  if (filterBy.star) return emails.filter((email) => email.isStar);
  if (filterBy.trash) return emails.filter((email) => email.deletedAt);
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
      email.to === loggedinUser.email &&
      !email.isRead &&
      !email.deletedAt & !email.isDraft
  );
  return emails.length;
}

function checkIfSent(email) {
  if (email.fromEmail === loggedinUser.email) return true;
  return false;
}

function _filterBySearch(emails, searchKey) {
  var filtered = emails.filter((email) => {
    return email.fromName.toUpperCase().includes(searchKey.toUpperCase());
  });
  return filtered;
}

function addEmail(newEmail, isDraft = false) {
  var email = {};
  if (isEmailExsist(newEmail)) {
    var oldEmail = isEmailExsist(newEmail);
    oldEmail.subject = newEmail.titleInput
      ? newEmail.titleInput
      : newEmail.subject;
    oldEmail.body = newEmail.msgInput ? newEmail.msgInput : newEmail.body;
    oldEmail.to = newEmail.toInput ? newEmail.toInput : newEmail.to;
    oldEmail.isDraft = isDraft;
    _saveEmailsToStorage();
    return Promise.resolve();
  }
  email.id = newEmail.id;
  email.subject = newEmail.titleInput;
  email.body = newEmail.msgInput;
  email.isRead = false;
  email.sentAt = Date.now();
  email.to = newEmail.toInput;
  email.fromEmail = loggedinUser.email;
  email.fromName = loggedinUser.fullname;
  email.deletedAt = null;
  email.isStar = false;
  email.isDraft = isDraft;
  email.labels = newEmail.labels ? newEmail.labels : [];
  gEmails.unshift(email);

  _saveEmailsToStorage();
  return Promise.resolve();
}

function isEmailExsist(email) {
  var idx = getEmailIdxById(email.id);
  if (idx === -1) return null;
  return gEmails[idx];
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

function toggleStarState(email) {
  email.isStar = !email.isStar;
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

function getEmailById(id) {
  var idx = getEmailIdxById(id);
  return gEmails[idx];
}

function _saveEmailsToStorage() {
  storageService.saveToStorage(DB, gEmails);
}

function _loadEmailsFromStorage() {
  var emails = storageService.loadFromStorage(DB);
  return emails;
}
