"use client";
/** pages/Team.jsx */
import Image from "next/image";
import { PageHero } from "@/components/shared/PageHero";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
const productDesign = "/assets/vyoma-product-design.webp";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { FinalCTA } from "@/components/shared/FinalCTA";

const GROUPS = ["Leadership", "Design", "Engineering", "AI & ML", "Quality & Delivery"];

export function Team({ initialMembers = [] }) {
  const team = initialMembers;

  return (
    <>
      <PageHero
        eyebrow="Team"
        title="Different expertise. One team."
        copy="VYOMA is designed to bring product, design, engineering, and intelligence into one connected delivery model."
        image={productDesign}
        imageAlt="Product system visual"
      />

      <div className="flex flex-row items-center justify-center my-10 w-full">
        {team && (
          <AnimatedTooltip
            items={team.map((m) => ({
              id: m.id,
              name: m.name,
              designation: m.role,
              image: m.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}`,
            }))}
          />
        )}
      </div>

      {GROUPS.map(group => {
          const members = team.filter(m => (m.group || "Leadership") === group);
          if (!members.length) return null;
          return (
            <section key={group} className="section team-group">
              <p className="eyebrow team-group-label">{group}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {members.map(member => (
                  <article key={member.id} className="flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors shadow-sm">
                    <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 border border-[var(--accent)]/30 drop-shadow-md">
                      <Image
                        src={member.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`}
                        alt={`${member.name} — ${member.role} at VYOMA`}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-start flex-grow">
                      <h3 className="text-xl md:text-2xl font-display font-bold text-[var(--text)] mb-1">{member.name}</h3>
                      <span className="text-sm font-mono text-[var(--text-dim)] block mb-1">{member.role}</span>
                      <span className="text-xs font-mono text-[var(--accent)] block mb-4">{member.specialization}</span>
                      
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 flex-grow">
                        {member.bio || "Passionate about building scalable digital products and driving technological innovation forward."}
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-[var(--border)]">
                        <a 
                          href={`mailto:${member.email || member.name.split(' ')[0].toLowerCase() + '@vyomatechnologies.com'}`} 
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--bg)] bg-[var(--text)] px-4 py-2 rounded-md hover:bg-[var(--accent)] hover:text-white transition-all shadow-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2"/>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                          </svg>
                          Contact via Email
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

      <FinalCTA />
    </>
  );
}

