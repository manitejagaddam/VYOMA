"use client";
/** pages/Process.jsx */
import { PageHero } from "@/components/shared/PageHero";
import { Btn } from "@/components/shared/Btn";
import { STAGES } from "@/lib/fallback";
const workResearch = "/assets/work-research.png";
import { Timeline } from "@/components/ui/timeline";

export function Process({}) {
  return (
    <>
      <PageHero
        eyebrow="Approach"
        title="Good work has a visible path."
        copy="A clear process makes room for both craft and the messy, essential learning that surrounds a new product."
        image={workResearch}
        imageAlt="Research visual"
      />
      <section className="section process-page pb-0">
        <Timeline 
          data={STAGES.map(([no, title, desc]) => ({
            title: `${no} ${title}`,
            content: (
              <div className="text-neutral-500 dark:text-neutral-300 md:text-lg mb-8">
                <p>{desc}</p>
              </div>
            )
          }))}
        />
      </section>
      <section className="section centered-cta">
        <h2>Ready to turn the first useful decision into momentum?</h2>
        <Btn to="/contact" variant="primary">Start a Project</Btn>
      </section>
    </>
  );
}

