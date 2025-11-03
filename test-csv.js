import { readFileSync } from 'fs';

const csvData = readFileSync('./src/data/Wan Fur demo DB - Sheet1.csv', 'utf-8');

const lines = csvData.split('\n');
const products = [];

for (let i = 1; i < lines.length; i++) {
  if (!lines[i].trim()) continue;

  const values = [];
  let currentValue = '';
  let insideQuotes = false;

  for (let j = 0; j < lines[i].length; j++) {
    const char = lines[i][j];

    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      values.push(currentValue.trim());
      currentValue = '';
    } else {
      currentValue += char;
    }
  }
  values.push(currentValue.trim());

  if (values.length >= 5) {
    let category = values[1].replace(/^"Dinning chairs"$/i, 'Dining chairs');
    category = category.replace(/^"|"$/g, '');

    const imageUrl = values[2].replace(/^"|"$/g, '');
    const name = values[0].replace(/^"|"$/g, '');
    const id = `product-${i}`;

    products.push({
      name: name,
      category: category,
      imageUrl: imageUrl,
      description: values[3].replace(/^"|"$/g, ''),
      price: values[4].replace(/^"|"$/g, ''),
      url: '',
      id: id,
    });
  }
}

console.log('Total products loaded:', products.length);
console.log('First product:', JSON.stringify(products[0], null, 2));
