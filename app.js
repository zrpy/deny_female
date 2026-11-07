const translations = {
  ja: {
    pageTitle: "サインアップ", languageLabel: "表示言語", eyebrow: "男性向けコミュニティ",
    title: "サインアップ", intro: "気持ちを安心して話せる場所へ。", nameLabel: "表示名", namePlaceholder: "例：あお",
    emailLabel: "メールアドレス", passwordLabel: "パスワード", passwordPlaceholder: "8文字以上", genderLabel: "性別",
    genderPlaceholder: "選択してください", man: "男性", woman: "女性", other: "その他 / 回答しない", submit: "サインアップ",
    privacy: "デモ画面です。入力情報は送信・保存されません。", invalid: "入力内容を確認してください。",
    welcome: "ようこそ！登録内容を確認しました。これはデモのため、情報は送信・保存されていません。",
    rejected: "このコミュニティは男性向けです。今回は登録をご案内できません。入力情報は保存されていません。"
  },
  en: {
    pageTitle: "Sign up", languageLabel: "Display language", eyebrow: "A community for men",
    title: "Create your account", intro: "A place to talk openly and feel heard.", nameLabel: "Display name", namePlaceholder: "e.g. Alex",
    emailLabel: "Email address", passwordLabel: "Password", passwordPlaceholder: "At least 8 characters", genderLabel: "Gender",
    genderPlaceholder: "Select an option", man: "Man", woman: "Woman", other: "Another identity / Prefer not to say", submit: "Sign up",
    privacy: "Demo only. Your information is not sent or stored.", invalid: "Please check your entries.",
    welcome: "Welcome! Your details look good. This is a demo; nothing has been sent or saved.",
    rejected: "This community is for men, so we can't offer signup. Your information has not been saved."
  },
  es: {
    pageTitle: "Registro", languageLabel: "Idioma", eyebrow: "Una comunidad para hombres",
    title: "Crear una cuenta", intro: "Un lugar para hablar con libertad y sentirte escuchado.", nameLabel: "Nombre visible", namePlaceholder: "Ej.: Alex",
    emailLabel: "Correo electrónico", passwordLabel: "Contraseña", passwordPlaceholder: "Al menos 8 caracteres", genderLabel: "Género",
    genderPlaceholder: "Selecciona una opción", man: "Hombre", woman: "Mujer", other: "Otra identidad / Prefiero no decirlo", submit: "Registrarme",
    privacy: "Solo demostración. Tu información no se envía ni se guarda.", invalid: "Revisa los datos introducidos.",
    welcome: "¡Bienvenido! Los datos parecen correctos. Esta demo no envía ni guarda información.",
    rejected: "Esta comunidad está dirigida a hombres y no podemos ofrecerte el registro. Tus datos no se han guardado."
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
