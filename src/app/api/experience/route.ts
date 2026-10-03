import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read directly from the static file (hacky but works for local file system)
    const filePath = path.join(process.cwd(), 'src/data/experience.ts');
    let fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Extract the array using regex
    const match = fileContent.match(/export const experiences: Experience\[\] = (\[[\s\S]*?\]);/);
    if (match && match[1]) {
      // Need to parse JS object string to JSON (replace unquoted keys with quoted keys)
      let jsonStr = match[1]
        .replace(/id:/g, '"id":')
        .replace(/company:/g, '"company":')
        .replace(/position:/g, '"position":')
        .replace(/duration:/g, '"duration":')
        .replace(/responsibilities:/g, '"responsibilities":')
        .replace(/'/g, '"');
      
      const data = JSON.parse(jsonStr);
      return NextResponse.json(data);
    }
    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const filePath = path.join(process.cwd(), 'src/data/experience.ts');
    
    const newContent = `export type Experience = {
  id: string;
  company: string;
  position: string;
  duration: string;
  responsibilities: string[];
};

export const experiences: Experience[] = ${JSON.stringify(data, null, 2)};
`;

    fs.writeFileSync(filePath, newContent, 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to write data' }, { status: 500 });
  }
}
