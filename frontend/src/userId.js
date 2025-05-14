const USER_ID_KEY = "anon_user_id";
const USER_NAME_KEY = "anon_user_name";

function generateUserId() {
  return "user_" + Math.random().toString(36).substr(2, 16);
}

export function getUserId() {
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = generateUserId();
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
}

export function getUserName() {
  return localStorage.getItem(USER_NAME_KEY) || "";
}

export function setUserName(name) {
  localStorage.setItem(USER_NAME_KEY, name);
}