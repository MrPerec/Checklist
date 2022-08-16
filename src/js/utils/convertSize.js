function convertSize(length) {
  let i = 0;
  const type = [`б`, `Кб`, `Мб`, `Гб`, `Тб`, `Пб`];

  while ((length / 1000) | 0 && i < type.length - 1) {
    length /= 1024;
    i++;
  }

  return `${length.toFixed(2)} ${type[i]}`;
}
