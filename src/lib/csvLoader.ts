import csvData from '@/data/Wan Fur demo DB - Bolt - Sheet1.csv?raw';

export interface Product {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  description: string;
  price: string;
  url: string;
}

export async function loadProducts(): Promise<Product[]> {
  try {
    const products: Product[] = [];
    const rows: string[][] = [];

    let currentRow: string[] = [];
    let currentField = '';
    let insideQuotes = false;

    for (let i = 0; i < csvData.length; i++) {
      const char = csvData[i];
      const nextChar = csvData[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          currentField += '"';
          i++;
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        currentRow.push(currentField);
        currentField = '';
      } else if (char === '\n' && !insideQuotes) {
        currentRow.push(currentField);
        if (currentRow.some(field => field.trim() !== '')) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentField = '';
      } else if (char === '\r' && nextChar === '\n' && !insideQuotes) {
        currentRow.push(currentField);
        if (currentRow.some(field => field.trim() !== '')) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentField = '';
        i++;
      } else {
        currentField += char;
      }
    }

    if (currentField || currentRow.length > 0) {
      currentRow.push(currentField);
      if (currentRow.some(field => field.trim() !== '')) {
        rows.push(currentRow);
      }
    }

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];

      if (row.length >= 6) {
        const name = row[0].trim();
        let category = row[1].trim().replace(/^"Dinning chairs"$/i, 'Dining chairs');
        const imageUrl = row[2].trim();
        const description = row[3].trim();
        const price = row[4].trim();
        const url = row[5].trim();

        products.push({
          id: `product-${i}`,
          name: name,
          category: category,
          imageUrl: imageUrl,
          description: description,
          price: price,
          url: url,
        });
      }
    }

    return products;
  } catch (error) {
    console.error('Error loading CSV:', error);
    return [];
  }
}
