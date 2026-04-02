const COOKIE_NAME = "browser_notifications";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const getCookieValue = (name) => {
  if (typeof document === "undefined") return null;

  const entry = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${name}=`));

  if (!entry) return null;

  return decodeURIComponent(entry.slice(name.length + 1));
};

const setCookieValue = (name, value) => {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`;
};

export const setBrowserNotificationPreference = (value) => {
  setCookieValue(COOKIE_NAME, value);
};

export const getBrowserNotificationPreference = () => {
  const value = getCookieValue(COOKIE_NAME);
  if (value === "enabled" || value === "disabled") {
    return value;
  }

  return null;
};

export const requestBrowserNotificationPermission = async () => {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "unsupported";
  }

  if (Notification.permission === "granted") {
    setCookieValue(COOKIE_NAME, "enabled");
    return "granted";
  }

  if (Notification.permission === "denied") {
    setCookieValue(COOKIE_NAME, "disabled");
    return "denied";
  }

  const shouldEnable = window.confirm("Allow browser notifications for complaint updates?");
  if (!shouldEnable) {
    setCookieValue(COOKIE_NAME, "disabled");
    return "denied";
  }

  const permission = await Notification.requestPermission();
  setCookieValue(COOKIE_NAME, permission === "granted" ? "enabled" : "disabled");
  return permission;
};

export const showBrowserNotification = ({ title, body }) => {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return false;
  }

  if (Notification.permission !== "granted") {
    return false;
  }

  const notification = new Notification(title, {
    body,
    tag: "smart-campus-complaint"
  });

  notification.onclick = () => {
    window.focus();
    notification.close();
  };

  return true;
};
