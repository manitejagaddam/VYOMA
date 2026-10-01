"use client";
/** pages/FAQ.jsx */
import { useState } from "react";
import { PageHero } from "@/components/shared/PageHero";
import { Btn } from "@/components/shared/Btn";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

const workAutomation = "/assets/work-automation.webp";

export function FAQ({ initialFaqs = [] }) {
  const [open, setOpen] = useState(0);
  const faqs = initialFaqs;

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="A few useful answers."
        copy="The details depend on the project, but these are the questions that help a new conversation get practical fast."
        image={workAutomation}
        imageAlt="Workflow visual"
      />
      <section className="section faq-page">
          <div className="faq-list">
            {faqs.map((item, i) => (
              <article key={item.id ?? i} className={`faq-item${open === i ? " open" : ""}`}>
                <button onClick={() => setOpen(open === i ? -1 : i)}>
                  <span className="faq-toggle">{open === i ? "−" : "+"}</span>
                  <span className="faq-question-text">{item.question}</span>
                </button>
                {open === i && <p>{item.answer}</p>}
              </article>
            ))}
          </div>
        <Btn to="/contact" variant="primary">Ask a different question</Btn>
      </section>
    </>
  );
}

