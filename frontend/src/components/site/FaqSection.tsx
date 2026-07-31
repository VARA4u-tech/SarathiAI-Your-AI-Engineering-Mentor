import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How fast can you build and deploy an MVP?",
    answer: "We typically design, build, and deploy production-ready AI MVPs within 2-4 weeks, depending on the complexity of your requirements. Our modular architecture allows us to move extremely fast.",
  },
  {
    question: "Do you build custom AI models or use existing ones?",
    answer: "We use a hybrid approach. We leverage state-of-the-art foundation models (like GPT-4, Claude 3, and Llama) for rapid development, and we can fine-tune custom models specifically on your proprietary data when specialized performance is needed.",
  },
  {
    question: "Who owns the code and IP?",
    answer: "You do. We build the software as a service for you. Upon completion and final payment, 100% of the intellectual property, source code, and assets are fully transferred to you.",
  },
  {
    question: "What kind of companies do you work with?",
    answer: "We partner with ambitious startups looking to launch fast, as well as established enterprises needing to integrate AI into their existing legacy systems without disrupting operations.",
  },
  {
    question: "Do you offer ongoing maintenance after launch?",
    answer: "Yes, we offer flexible retention and maintenance plans. We can continuously monitor model performance, update dependencies, and add new features as your user base scales.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-32 overflow-hidden border-t border-white/5">
      {/* Subtle Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="relative mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Everything you need to know about how we work and what we can build for you.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen ? "bg-white/[0.05] border-white/20" : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.03]"
                } backdrop-blur-md`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                >
                  <span className="font-medium text-lg text-white/90 pr-8">{faq.question}</span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? "bg-white text-black border-white"
                        : "border-white/20 text-white/50"
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                        <p className="text-white/60 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
