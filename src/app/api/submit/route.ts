import { track } from '@vercel/analytics/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // После успешной отправки в CRM или куда там отправляются данные
    await track('Lead Generated', {
      source: 'quiz',
      hasContact: !!data.phone || !!data.whatsapp || !!data.telegram
    });
    
    // ... existing code ...
  } catch (error) {
    await track('Lead Error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    // ... existing code ...
  }
} 