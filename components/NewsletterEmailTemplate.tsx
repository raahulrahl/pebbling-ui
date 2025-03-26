import * as React from 'react';

interface NewsletterEmailTemplateProps {
  email: string;
}

export const NewsletterEmailTemplate: React.FC<Readonly<NewsletterEmailTemplateProps>> = ({
  email,
}) => (
  <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <h1 style={{ color: '#f97316', marginTop: '32px', marginBottom: '16px' }}>
      Welcome to Pebbling AI Newsletter!
    </h1>
    <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: '24px' }}>
      Thank you for subscribing to our newsletter with <strong>{email}</strong>. 
      You'll now receive updates about Pebbling AI and agent-to-agent communication.
    </p>
    <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: '24px' }}>
      We're excited to have you join our community!
    </p>
    <div style={{ marginTop: '32px', marginBottom: '32px' }}>
      <a 
        href="https://pebbling.ai" 
        style={{ 
          backgroundColor: '#f97316', 
          color: 'white', 
          padding: '12px 24px', 
          textDecoration: 'none', 
          borderRadius: '4px', 
          fontWeight: 500 
        }}
      >
        Visit Pebbling AI
      </a>
    </div>
    <p style={{ color: '#6b7280', fontSize: '14px' }}>
      If you didn't sign up for this newsletter, you can safely ignore this email.
    </p>
  </div>
);

export default NewsletterEmailTemplate;
