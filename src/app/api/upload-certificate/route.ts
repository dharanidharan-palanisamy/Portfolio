import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Create certifications directory in public if it doesn't exist
    const publicDir = path.join(process.cwd(), 'public');
    const certDir = path.join(publicDir, 'certifications');
    
    if (!fs.existsSync(certDir)) {
      fs.mkdirSync(certDir, { recursive: true });
    }

    // Generate unique filename preserving extension
    const ext = path.extname(file.name) || '.pdf'; // default to pdf if no extension
    const uniqueId = Math.random().toString(36).substring(2, 9);
    const fileName = `cert_${Date.now()}_${uniqueId}${ext}`;
    const filePath = path.join(certDir, fileName);
    
    fs.writeFileSync(filePath, buffer);

    // Return the URL to be stored in the JSON
    const fileUrl = `/certifications/${fileName}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error('Error uploading certificate:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
