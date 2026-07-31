export default function SeoJsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Smart Campus Complaint & Service Management System",
    "url": "https://smartcampus.edu",
    "logo": "https://smartcampus.edu/images/hero_campus_tech.png",
    "description": "Enterprise-grade real-time complaint, facility issue tracking, and service management system for educational institutions.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-555-CAMPUS",
      "contactType": "technical support",
      "availableLanguage": ["English"]
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Smart Campus Complaint Management Platform",
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1250"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do students and faculty submit a complaint?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Log in to the Smart Campus portal using your college ID or institutional email, select your issue category, add details or urgency priority, and hit submit. The ticket is immediately routed to the responsible department."
        }
      },
      {
        "@type": "Question",
        "name": "How long does issue resolution typically take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "High priority or emergency facility complaints (e.g. electrical/water outages) are responded to within 1-2 hours. General requests are typically resolved within 24 to 48 hours."
        }
      },
      {
        "@type": "Question",
        "name": "Is my complaint information confidential?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all data is encrypted in transit and at rest in compliance with student privacy guidelines (FERPA standards). Only assigned staff and department leadership can view ticket details."
        }
      },
      {
        "@type": "Question",
        "name": "What role-based access levels exist in the system?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The platform supports customized roles for Student, Faculty, Staff, HOD, Director, and Administrator, each with tailored views and action permissions."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
