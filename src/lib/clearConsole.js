export const clearConsole = () => {
  if (window.console || window.console.firebug) {
    console.clear();
  }
};