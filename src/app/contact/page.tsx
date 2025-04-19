export default function ContactPage() {
    return (
      <main className="min-h-screen bg-primeflix-bg text-white p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p>
            Have questions, feedback, or need assistance? The PrimeFlix team is ready to support you.
          </p>
          <ul className="space-y-2">
            <li>
              <strong>Email:</strong> <a href="mailto:support@primeflix.site" className="text-blue-400">support@primeflix.site</a>
            </li>
            <li>
              <strong>Phone:</strong> +91-XXXXXXXXXX
            </li>
            <li>
              <strong>Address:</strong> 123 Entertainment Avenue, New Delhi, India
            </li>
          </ul>
          <p>
            <strong>Business Hours:</strong><br />
            Monday to Friday: 9:00 AM – 6:00 PM IST<br />
            Saturday: 10:00 AM – 4:00 PM IST<br />
            Sunday: Closed
          </p>
          <p>
            <strong>Stay Connected:</strong><br />
            <a href="#" className="text-blue-400">Facebook</a> | <a href="#" className="text-blue-400">Twitter</a> | <a href="#" className="text-blue-400">Instagram</a>
          </p>
        </div>
      </main>
    );
  }
  