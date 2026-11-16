export const THEME_KEY = "portfolio-theme";

// Runs in <head> before first paint. Dark is the default; only a stored "light" sets the attribute.
export const headScript = [
  'document.documentElement.classList.add("js");',
  `try{if(localStorage.getItem("${THEME_KEY}")==="light")document.documentElement.dataset.theme="light"}catch(e){}`,
].join("");

export const nextTheme = (current: string | undefined): "light" | "dark" => (current === "light" ? "dark" : "light");
