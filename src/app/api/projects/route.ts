import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'projects.ts');
    let fileContent = fs.readFileSync(filePath, 'utf-8');
    const match = fileContent.match(/export const projects: Project\[\] = (\[[\s\S]*?\]);/);
    if (match && match[1]) {
      // Very basic conversion of JS array string to JSON by fixing keys
      let jsonStr = match[1]
        .replace(/id:/g, '"id":')
        .replace(/title:/g, '"title":')
        .replace(/projectType:/g, '"projectType":')
        .replace(/category:/g, '"category":')
        .replace(/shortDescription:/g, '"shortDescription":')
        .replace(/technologies:/g, '"technologies":')
        .replace(/role:/g, '"role":')
        .replace(/year:/g, '"year":')
        .replace(/slug:/g, '"slug":')
        .replace(/imageUrl:/g, '"imageUrl":')
        .replace(/liveUrl:/g, '"liveUrl":')
        .replace(/timeline:/g, '"timeline":')
        .replace(/challenge:/g, '"challenge":')
        .replace(/objective:/g, '"objective":')
        .replace(/process:/g, '"process":')
        .replace(/gridSpan:/g, '"gridSpan":');
        
      // Also need to handle single quotes if any exist. In the original they are double quotes usually.
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
    const filePath = path.join(process.cwd(), 'src', 'data', 'projects.ts');
    const newContent = `export type Project = {
  id: string;
  title: string;
  projectType: "web" | "design";
  category: string;
  shortDescription: string;
  technologies: string[];
  role: string;
  year: string;
  slug: string;
  imageUrl?: string;
  liveUrl?: string;
  timeline?: string;
  challenge?: string;
  objective?: string;
  process?: string[];
  gridSpan?: string;
};

export const projects: Project[] = ${JSON.stringify(data, null, 2)};
`;
    fs.writeFileSync(filePath, newContent, 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to write data' }, { status: 500 });
  }
}
