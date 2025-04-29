
import React from 'react';

interface EmailContentProps {
  from: {
    name: string;
  };
}

export function EmailContent({ from }: EmailContentProps) {
  // Generate a random content (In a real app, this would come from the email)
  const content = `
    <p>Hi there,</p>
    <p>Thanks for your email. I wanted to follow up on our conversation about the project timeline.</p>
    <p>We're making good progress and should be able to meet our deadlines as discussed. Here are some key updates:</p>
    <ul>
      <li>Frontend development is 80% complete</li>
      <li>Backend API integration is on track</li>
      <li>QA testing will begin next week</li>
    </ul>
    <p>Let me know if you have any questions or concerns.</p>
    <p>Best regards,<br>${from.name}</p>
  `;

  return (
    <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
  );
}
