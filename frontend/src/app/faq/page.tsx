'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is your shipping policy?",
    answer: "We offer free shipping on orders over ₹2000. Standard shipping typically takes 3-5 business days within India, while express shipping takes 1-2 business days. International shipping is available and varies by location."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 30 days of purchase. Items must be unworn, unwashed, and in their original condition with tags attached. Refunds are processed within 5-7 business days after we receive your return."
  },
  {
    question: "How do I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history in the dashboard."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted."
  },
  {
    question: "How do I know what size to order?",
    answer: "Each product page includes a detailed size chart. We recommend measuring yourself and comparing with our size guide. If you're between sizes, we suggest sizing up for a more comfortable fit."
  },
  {
    question: "Do you offer gift cards?",
    answer: "Yes! Gift cards are available in denominations of ₹1000, ₹2000, ₹5000, and ₹10000. They never expire and can be used for any purchase on our website."
  },
  {
    question: "Can I change or cancel my order?",
    answer: "You can modify or cancel your order within 1 hour of placing it. After that, orders are processed and cannot be changed. Please contact our customer service team immediately if you need assistance."
  },
  {
    question: "Are your products sustainable?",
    answer: "We're committed to sustainability. Many of our products are made from organic or recycled materials, and we partner with ethical manufacturers who follow fair labor practices."
  },
  {
    question: "Do you have a physical store?",
    answer: "We're primarily an online retailer, but we do have a flagship store location. Check our Contact page for store details and hours."
  },
  {
    question: "How can I contact customer service?",
    answer: "You can reach our customer service team via email at support@rysewears.com, through our Contact page, or by calling 1-800-RYSE-WEAR during business hours (Mon-Fri, 9am-6pm EST)."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors page-transition">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 py-16 px-4 animate-fade-in">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-indigo-100 font-sans">
              Find answers to common questions about RYSE Wears
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl animate-scale-in"
                style={{animationDelay: `${index * 0.05}s`}}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300 group"
                >
                  <span className="font-semibold text-gray-900 dark:text-white pr-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-6 h-6 text-gray-500 dark:text-gray-400 transform transition-all duration-500 flex-shrink-0 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 ${
                      openIndex === index ? 'rotate-180 scale-110' : 'scale-100'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div 
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 font-sans">
              Can&apos;t find the answer you&apos;re looking for? Our customer support team is here to help.
            </p>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105 shadow-md"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
