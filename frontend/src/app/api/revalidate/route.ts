import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In production, you would want to secure this with a secret token
    // const secret = request.headers.get('x-revalidate-secret');
    // if (secret !== process.env.REVALIDATION_SECRET) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { tag, path } = body;

    if (tag) {
      revalidateTag(tag);
      console.log(`Revalidated cache tag: ${tag}`);
    }
    
    if (path) {
      revalidatePath(path);
      console.log(`Revalidated cache path: ${path}`);
    }

    if (!tag && !path) {
      return NextResponse.json({ message: 'Missing tag or path' }, { status: 400 });
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
