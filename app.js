const translations = {
  ja: {
    pageTitle: "サインアップ", languageLabel: "表示言語", eyebrow: "男性向けコミュニティ",
    title: "サインアップ", intro: "気持ちを安心して話せる場所へ。", nameLabel: "表示名", namePlaceholder: "例：あお",
    emailLabel: "メールアドレス", passwordLabel: "パスワード", passwordPlaceholder: "8文字以上", genderLabel: "性別",
    genderPlaceholder: "選択してください", man: "男性", woman: "女性", other: "その他 / 回答しない", submit: "サインアップ",
    privacy: "女にプライバシーは必要ない。", invalid: "入力内容を確認してください。",
    welcome: "ようこそ！登録内容を確認しました。",
    rejected: "このコミュニティは男性向けだ。\n早く出ていけ。"
  },
  en: {
    pageTitle: "Sign up", languageLabel: "Display language", eyebrow: "A community for men",
    title: "Create your account", intro: "A place to talk openly and feel heard.", nameLabel: "Display name", namePlaceholder: "e.g. Alex",
    emailLabel: "Email address", passwordLabel: "Password", passwordPlaceholder: "At least 8 characters", genderLabel: "Gender",
    genderPlaceholder: "Select an option", man: "Man", woman: "Woman", other: "Another identity / Prefer not to say", submit: "Sign up",
    privacy: "Female don\'t need privacy.", invalid: "Please check your entries.",
    welcome: "Welcome! Your details look good.",
    rejected: "This community is for men, so we must get out early."
  }
};

const form = document.querySelector("#signup-form");
const language = document.querySelector("#language");
const status = document.querySelector("#status");

function applyLanguage(code) {
  const text = translations[code] || translations.ja;
  document.documentElement.lang = code;
  document.title = text.pageTitle;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = text[element.dataset.i18n];
    if (value !== undefined) element.textContent = value;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const value = text[element.dataset.i18nPlaceholder];
    if (value !== undefined) element.placeholder = value;
  });
  status.textContent = "";
  status.className = "status";
}

language.addEventListener("change", () => applyLanguage(language.value));
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = translations[language.value] || translations.ja;
  status.className = "status";
  if (!form.checkValidity()) {
    status.textContent = text.invalid;
    status.classList.add("error");
    status.focus();
    form.reportValidity();
    return;
  }
  const isMan = document.querySelector("#gender").value === "man";
  status.textContent = isMan ? text.welcome : text.rejected;
  status.classList.add(isMan ? "success" : "error");
  status.focus();
});
