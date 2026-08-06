import { MessageSquareText, Mail } from "lucide-react";
import Link from "next/link";

const FaqContact = () => (
  <div className="bg-[#0C1B44] rounded-2xl p-8 md:p-12 mx-auto max-w-7xl">
    <div className="flex flex-col items-center">
      <MessageSquareText className="size-12 text-[#A92EDF] mb-6" />
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
        Still have questions?
      </h2>
      <p className="text-gray-400 mb-8 max-w-xl mx-auto">
        Our support team is available 24/7 to help with any questions or issues.
      </p>
      <Link
        href={"/contact"}
        aria-label="Contact support team"
        className="bg-[#A92EDF] hover:bg-[#70328b] text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 flex items-center gap-2"
      >
        <Mail className="size-5" />
        Contact Support
      </Link>
    </div>
  </div>
);

export default FaqContact;