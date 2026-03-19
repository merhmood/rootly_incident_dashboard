export function ManagerInsights() {
  return (
    <section>
      <div className="sec mb24">Manager Insights &amp; Actions</div>
      <div className="insight-grid fade-in">
        <InsightCard
          label="Reliability Risk"
          num="61h"
          numColor="var(--r)"
          desc="SEV1 morpheus_ai_llm_gw_error_rate from Mar 13 closed without resolution after 61 hours. Mean MTTR inflated 5× by this outlier. Requires post-incident review — was this a monitoring gap or active degradation?"
        />
        <InsightCard
          label="Process Gap"
          num="38%"
          numColor="var(--y)"
          desc="Signal-to-noise ratio remains at 38%. Duplicate alarm suppression and smarter alert grouping in Rootly should be prioritized for Q2. Target: reduce noise to under 15% of total incident volume."
        />
        <InsightCard
          label="Recurring SLO"
          num="6×"
          numColor="var(--pu)"
          desc="morpheus_ai_llm_gw_error_rate fired 6 times this week (4 SEV1, 2 SEV2). This is a repeat-offender SLO. The Morpheus team should review error budget burn rate and whether the alert threshold is appropriately calibrated."
        />
        <InsightCard
          label="What's Working"
          num="0.0h"
          numColor="var(--g)"
          desc="MTTD is 0 hours across all 24 SEV1+SEV2 incidents — the on-call team is acknowledging every alert immediately. Detection is not the bottleneck; mitigation speed and noise reduction are the focus areas."
        />
        <InsightCard
          label="Customer Impact"
          num="2"
          numColor="var(--r)"
          desc="Two confirmed system-wide customer-impacting incidents: SEV1 tenant-provisioning (PaaS, Mar 14, resolved in 4.09h) and SEV2 1cp-composite (ALM, Mar 16, resolved in 3.63h). Both resolved within target windows."
        />
        <InsightCard
          label="Recommended Action"
          num="3"
          numColor="var(--bl)"
          desc="Three items for the team: (1) Post-incident review for 61h Morpheus outlier, (2) JIRA ticket to implement Rootly alert deduplication for ALM + Morpheus streams, (3) Assign value stream owner for 2 NATS incidents showing N/A stream."
        />
      </div>
    </section>
  );
}

function InsightCard({ label, num, numColor, desc }: { label: string, num: string, numColor: string, desc: string }) {
  return (
    <div className="insight">
      <div className="insight-label">{label}</div>
      <div className="insight-num" style={{ color: numColor }}>{num}</div>
      <div className="insight-desc">{desc}</div>
    </div>
  );
}
