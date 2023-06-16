export function getItemFromLocalStorage(key: string): any {
  const itemString = localStorage.getItem(key);
  if (itemString) {
    return JSON.parse(itemString);
  } else {
    console.log(`Item '${key}' não encontrado no localStorage`);
    return {};
  }
}

export function getUserFromLocalStorage(): any {
  const userString = localStorage.getItem('user');
  if (userString) {
    return JSON.parse(userString);
  } else {
    console.log("Usuário não encontrado no localStorage");
    return {};
  }
}

export function getEmptyFields(payload: any): string[] {
  const emptyFields = [];
  const fields = Object.keys(payload);

  for (const field of fields) {
    if (!payload[field]) {
      emptyFields.push(field);
    }
  }

  return emptyFields;
}

export function handleMessage(emptyFields: string[]): string {
  const fieldNames: Record<string, string> = {
    age: 'Idade',
    name: 'Nome',
    surname: 'Sobrenome',
    gender: 'Gênero',
    city: 'Cidade',
    state: 'Estado'
  };

  let message = '';
  if (emptyFields.length > 0) {
    const fieldLabels = emptyFields.map((field: string) => fieldNames[field]);
    message = fieldLabels.join(', ');
  } else {
    message = fieldNames[emptyFields[0]];
  }
  return message;
}
