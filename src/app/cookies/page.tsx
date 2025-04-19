export default function CookiePolicy() {
    return (
      <main className="min-h-screen bg-primeflix-bg text-white p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold">Cookie Policy</h1>
          <p>
            PrimeFlix uses cookies to enhance your browsing experience. This policy outlines how we use cookies on our platform.
          </p>
          <h2 className="text-2xl font-semibold">What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device to collect standard internet log information and visitor behavior information.
          </p>
          <h2 className="text-2xl font-semibold">How We Use Cookies</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To remember your preferences and settings.</li>
            <li>To understand how you use our website.</li>
            <li>To improve site functionality and user experience.</li>
          </ul>
          <h2 className="text-2xl font-semibold">Managing Cookies</h2>
          <p>
            You can set your browser not to accept cookies. However, in a few cases, some of our website features may not function as a result.
          </p>
          <p>
            For more information, please contact us at <a href="mailto:privacy@primeflix.site" className="text-blue-400">privacy@primeflix.site</a>.
          </p>
        </div>
      </main>
    );
  }
  