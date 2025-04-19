export default function PrivacyPolicyPage() {
    return (
      <main className="min-h-screen bg-primeflix-bg text-white p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold">Privacy Policy & Terms of Service</h1>
          <p><strong>Effective Date:</strong> April 19, 2025</p>
          <section>
            <h2 className="text-2xl font-semibold">Privacy Policy</h2>
            <p>
              At PrimeFlix, we prioritize your privacy. This policy outlines how we collect, use, and protect your information.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Information We Collect:</strong> Personal Information (Name, email address, payment details), Usage Data (Viewing history, preferences, device information).</li>
              <li><strong>How We Use Your Information:</strong> To personalize your streaming experience, process transactions, communicate updates, and improve our platform.</li>
              <li><strong>Data Protection:</strong> We implement robust security measures to safeguard your data against unauthorized access, alteration, or disclosure.</li>
              <li><strong>Cookies:</strong> PrimeFlix uses cookies to enhance user experience. You can manage cookie preferences through your browser settings.</li>
              <li><strong>Third-Party Services:</strong> We may share information with trusted partners for payment processing and analytics, ensuring they adhere to strict confidentiality agreements.</li>
              <li><strong>Your Rights:</strong> You have the right to access, modify, or delete your personal data. Contact us at <a href="mailto:privacy@primeflix.site" className="text-blue-400">privacy@primeflix.site</a> for any requests.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">Terms of Service</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Account Responsibility:</strong> Users are responsible for maintaining the confidentiality of their account credentials.</li>
              <li><strong>Content Usage:</strong> Content is for personal, non-commercial use only.</li>
              <li><strong>Prohibited Activities:</strong> Unauthorized distribution or commercial exploitation of content is prohibited.</li>
              <li><strong>Termination:</strong> We reserve the right to suspend or terminate accounts violating our policies.</li>
            </ul>
            <p>
              For detailed terms, please visit our <a href="#" className="text-blue-400">Terms of Service</a> page.
            </p>
          </section>
        </div>
      </main>
    );
  }
  