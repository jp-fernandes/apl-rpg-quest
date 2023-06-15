export function getItemFromLocalStorage(key: string): any {
  const itemString = localStorage.getItem(key);
  if (itemString) {
    return JSON.parse(itemString);
  } else {
    console.log(`Item '${key}' não encontrado no localStorage`);
    return {};
  }
}
