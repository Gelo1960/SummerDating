interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  city: string;
  category: string;
}

export default function FAQSection({ faqs, city, category }: FAQSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="faq-section" aria-label="Questions frequentes">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h2 className="faq-section-title">
        Questions sur les {category} a {city}
      </h2>

      {faqs.map((faq, index) => (
        <details key={index} className="faq-item">
          <summary>{faq.question}</summary>
          <div className="faq-answer">
            <p>{faq.answer}</p>
          </div>
        </details>
      ))}
    </section>
  );
}
