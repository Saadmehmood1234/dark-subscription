export default function RefundPolicy() {
    return (
      <main className="min-h-screen bg-primeflix-bg text-white p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold">Refund Policy</h1>
          <p>
            At PrimeFlix, we strive to provide the best streaming experience. If you're not satisfied with our service, please review our refund policy below.
          </p>
          <h2 className="text-2xl font-semibold">Eligibility for Refunds</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Refund requests must be made within 7 days of subscription purchase.</li>
            <li>Only first-time subscribers are eligible for refunds.</li>
            <li>Refunds are not applicable for promotional or discounted subscriptions.</li>
          </ul>
          <h2 className="text-2xl font-semibold">How to Request a Refund</h2>
          <p>
            To request a refund, please contact our support team at <a href="mailto:support@primeflix.site" className="text-blue-400">support@primeflix.site</a> with your account details and reason for the refund.
          </p>
          <h2 className="text-2xl font-semibold">Processing Time</h2>
          <p>
            Approved refunds will be processed within 5-7 business days to the original payment method.
          </p>
        </div>
      </main>
    );
  }
  