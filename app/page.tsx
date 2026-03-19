import { Suspense } from "react";
import Script from "next/script";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { IncidentTable } from "./_components/IncidentTable";
import { SloChart } from "./_components/SloChart";
import { ManagerInsights } from "./_components/ManagerInsights";
import { SignalQualitySection } from "./_components/SignalQuality";
import { OperationalIntelligence } from "./_components/OperationalIntelligence";

const plexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export const unstable_instant = { prefetch: "static" };

export default function Home() {
  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js" strategy="afterInteractive" />
      <div className={`${plexSans.variable} ${plexMono.variable} font-sans`} style={{ maxWidth: '1340px', margin: '0 auto', padding: '28px 24px' }}>
        
        {/* ─── HEADER ─── */}
        <header className="hdr fade-in">
          <div className="hdr-left">
            <h1>ODC SRE Weekly Ops Dashboard</h1>
            <p>OutSystems Developer Cloud &nbsp;·&nbsp; Reporting period: Mar 13 – Mar 19, 2026</p>
          </div>
          <div className="hdr-right">
            <div className="live-badge"><span className="dot"></span>3 Active Incidents</div>
            <div className="hdr-ts">Generated: 2026-03-19 &nbsp;|&nbsp; Source: Rootly OPS</div>
          </div>
        </header>

        {/* ─── OPERATIONAL INTELLIGENCE ─── */}
        <OperationalIntelligence />

        {/* ─── EXECUTIVE SUMMARY ─── */}
        <section>
          <div className="sec mb24">Executive Summary</div>
          <div className="kpi-grid fade-in">
            <KpiCard label="Total SLO Incidents" value="35" sub="All severities this week" />
            <KpiCard label="SEV1 Incidents" value="6" sub="1 active right now" variant="alert" />
            <KpiCard label="SEV2 Incidents" value="18" sub="2 active right now" variant="warn" />
            <KpiCard label="Customer Impact" value="2" sub="Confirmed system-wide" variant="alert" />
            <KpiCard label="Signal Noise" value={<span>38<span style={{ fontSize: '18px' }}>%</span></span>} sub="9 dup / false-positive" variant="warn" />
            <KpiCard label="MTTD (All)" value="0h" sub="All incidents acked instantly" valueStyle={{ color: 'var(--g)' }} />
          </div>
        </section>

        {/* ─── RESPONSE PERFORMANCE ─── */}
        <section>
          <div className="sec mb24">Response Performance</div>
          <div className="two-col fade-in">
            {/* SEV1 */}
            <AnalysisCard
              title="SEV1 Analysis"
              chip="CRITICAL"
              chipClass="chip-s1"
              sub="6 incidents &nbsp;·&nbsp; Morpheus AI LLM GW dominant"
              metrics={[
                { label: "Total SEV1", value: "6 incidents" },
                { label: "Resolved / Closed", value: "3 actionable", valueClass: "grn" },
                { label: "Cancelled (noise)", value: "2 duplicates", valueClass: "yel" },
                { label: "Active (in progress)", value: "1 started", valueClass: "red" },
                { label: "MTTD", value: "0.0 h (all)", valueClass: "grn" },
                { label: "MTTR — median", value: "4.09 h", valueClass: "yel" },
                { label: "MTTR — mean", value: "22.2 h ⚠", valueClass: "red" },
                { label: "System-wide impact", value: "1 confirmed", valueClass: "red" },
                { label: "Primary SLO firing", value: "morpheus llm_gw_error", valueClass: "pu" },
                { label: "Primary value stream", value: "Morpheus (5/6)" },
              ]}
              callout="<b>OUTLIER — 61.12h resolution:</b> SEV1 on 2026-03-13 (morpheus_ai_llm_gw_error_rate) closed after 61 hours. This inflates mean MTTR significantly. Was this a monitoring/closure process gap? Confirm with Morpheus team."
            />
            {/* SEV2 */}
            <AnalysisCard
              title="SEV2 Analysis"
              chip="HIGH"
              chipClass="chip-s2"
              sub="18 incidents &nbsp;·&nbsp; Distributed across 5+ SLOs"
              metrics={[
                { label: "Total SEV2", value: "18 incidents" },
                { label: "Resolved / Closed", value: "8 actionable", valueClass: "grn" },
                { label: "Cancelled (noise)", value: "7 (5 dup, 2 FP)", valueClass: "yel" },
                { label: "Active (in progress)", value: "2 started", valueClass: "red" },
                { label: "MTTD", value: "0.0 h (all)", valueClass: "grn" },
                { label: "MTTR — median", value: "0.65 h", valueClass: "grn" },
                { label: "MTTR — mean", value: "1.22 h", valueClass: "grn" },
                { label: "System-wide impact", value: "1 confirmed", valueClass: "yel" },
                { label: "Fastest resolution", value: "0.06 h (otel-collector)", valueClass: "grn" },
                { label: "Slowest resolution", value: "3.63 h (1cp-composite)", valueClass: "yel" },
              ]}
              callout="<b>NOISE CONCERN — 39% SEV2 cancellation rate:</b> 7 of 18 SEV2s were cancelled — 1cp-composite-success-rate generated 4 incidents (3 duplicate). Review alarm deduplication for ALM stream SLOs."
              calloutClass="callout-y"
            />
          </div>
        </section>

        {/* ─── MTTR COMPARISON ─── */}
        <section>
          <div className="sec mb24">MTTR by Value Stream (Resolved/Closed Only)</div>
          <div className="card mb32 fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <MttrColumn title="SEV1 Resolution Times" data={[
                { label: "morpheus llm_gw (2026-03-14)", val: "1.31h", color: "var(--g)", width: "2%" },
                { label: "tenant-provisioning (2026-03-14)", val: "4.09h", color: "var(--y)", width: "7%" },
                { label: "morpheus llm_gw (2026-03-13) ⚠", val: "61.12h", color: "var(--r)", width: "100%" },
              ]} />
              <MttrColumn title="SEV2 Resolution Times (top)" data={[
                { label: "1cp-composite (2026-03-16)", val: "3.63h", color: "var(--y)", width: "100%" },
                { label: "data-fabric-queryengine-latency", val: "2.35h", color: "var(--y)", width: "65%" },
                { label: "tenant-provisioning (avg 3 events)", val: "1.02h", color: "var(--g)", width: "28%" },
                { label: "data-fabric-queryengine-avail", val: "0.62h", color: "var(--g)", width: "17%" },
                { label: "otel-collector-availability", val: "0.06h", color: "var(--g)", width: "2%" },
              ]} />
            </div>
          </div>
        </section>

        {/* ─── SLO FREQUENCY ─── */}
        <section>
          <div className="sec mb24">SLO Firing Frequency</div>
          <Suspense fallback={<div className="h-[340px] animate-pulse" />}>
            <SloChart />
          </Suspense>
        </section>

        {/* ─── SIGNAL QUALITY ─── */}
        <SignalQualitySection />

        {/* ─── ACTIVE INCIDENTS ─── */}
        <section>
          <div className="sec mb24">Active Incidents — Right Now</div>
          <div className="card mb32 fade-in">
            <div style={{ fontSize: '11px', color: 'var(--t2)', marginBottom: '14px' }}>
              3 incidents currently in <b style={{ color: 'var(--r)' }}>started</b> state with no mitigation recorded yet. Requires immediate attention.
            </div>

            <ActiveIncident
              title="System-wide · ga · morpheus_ai_llm_gw_error_rate"
              meta="Started: 2026-03-19T02:27:12 PDT &nbsp;·&nbsp; MTTD: 0h &nbsp;·&nbsp; Mitigation: —"
              dotClass="inc-r"
              tags={[
                { label: "SEV1", variant: "tag-r" },
                { label: "Morpheus" },
                { label: "AI LLM Gateway" },
                { label: "0h acknowledged", variant: "tag-r" },
              ]}
            />

            <ActiveIncident
              title="System-wide · ga · tenant-provisioning-success-rate"
              meta="Started: 2026-03-19T02:33:22 PDT &nbsp;·&nbsp; MTTD: 0h &nbsp;·&nbsp; Mitigation: —"
              dotClass="inc-y"
              tags={[
                { label: "SEV2", variant: "tag-y" },
                { label: "PaaS" },
                { label: "Tenant Provisioning" },
                { label: "system-wide: No" },
              ]}
            />

            <ActiveIncident
              title="System-wide · ga · nats-availability"
              meta="Started: 2026-03-18T22:43:05 PDT &nbsp;·&nbsp; MTTD: 0h &nbsp;·&nbsp; Mitigation: —"
              dotClass="inc-y"
              tags={[
                { label: "SEV2", variant: "tag-y" },
                { label: "Unassigned" },
                { label: "NATS Messaging" },
                { label: "stream: N/A" },
              ]}
            />
          </div>
        </section>

        {/* ─── INCIDENT LOG ─── */}
        <section>
          <div className="sec mb24">Full Incident Log — SEV1 + SEV2</div>
          <div className="card mb32 fade-in">
            <Suspense fallback={<div className="h-64 animate-pulse" />}>
              <IncidentTable />
            </Suspense>
          </div>
        </section>

        {/* ─── MANAGER INSIGHTS ─── */}
        <ManagerInsights />

        {/* ─── FOOTER ─── */}
        <footer className="footer">
          <span>ODC SRE · Rootly OPS Data Export · Mar 13–19, 2026 · Principal SRE Weekly Report</span>
          <span>MTTD/MTTR computed from closed + resolved incidents only &nbsp;·&nbsp; Noise = cancelled (dup + FP)</span>
        </footer>

      </div>
    </>
  );
}

function KpiCard({ label, value, sub, variant, valueColor, valueStyle }: { label: string, value: string | React.ReactNode, sub: string, variant?: 'alert' | 'warn' | 'ok' | 'info', valueColor?: string, valueStyle?: React.CSSProperties }) {
  const variantClass = variant ? ` ${variant}` : '';
  return (
    <div className={`kpi${variantClass}`}>
      <div className="kpi-lbl">{label}</div>
      <div className={`kpi-val${valueColor ? ` ${valueColor}` : ''}`} style={valueStyle}>{value}</div>
      <div className="kpi-sub">{sub}</div>
    </div>
  );
}

function AnalysisCard({ title, chip, chipClass, sub, metrics, callout, calloutClass = 'callout' }: { title: string, chip: string, chipClass: string, sub: string, metrics: { label: string, value: string, valueClass?: string }[], callout: string, calloutClass?: string }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
        <div className="card-t">{title}</div>
        <span className={`chip ${chipClass}`}>{chip}</span>
      </div>
      <div className="card-sub" dangerouslySetInnerHTML={{ __html: sub }} />
      {metrics.map((m, i) => (
        <div key={i} className="mrow">
          <span className="mrow-lbl">{m.label}</span>
          <span className={`mrow-val${m.valueClass ? ` ${m.valueClass}` : ''}`}>{m.value}</span>
        </div>
      ))}
      <div className={calloutClass} dangerouslySetInnerHTML={{ __html: callout }} />
    </div>
  );
}

function MttrColumn({ title, data }: { title: string, data: { label: string, val: string, color: string, width: string }[] }) {
  return (
    <div>
      <div style={{ fontSize: '11px', color: 'var(--t3)', fontFamily: 'var(--mono)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '.6px' }}>{title}</div>
      {data.map((item, i) => (
        <div key={i} style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--t2)', marginBottom: '3px' }}>
            <span>{item.label}</span>
            <span style={{ color: item.color }}>{item.val}</span>
          </div>
          <div style={{ height: '5px', background: 'var(--s3)', borderRadius: '3px' }}>
            <div style={{ width: item.width, height: '100%', background: item.color, borderRadius: '3px' }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ActiveIncident({ title, meta, dotClass, tags }: { title: string, meta: string, dotClass: string, tags: { label: string, variant?: string }[] }) {
  return (
    <div className="active-inc">
      <div className={`inc-dot ${dotClass}`}></div>
      <div style={{ flex: 1 }}>
        <div className="inc-title">{title}</div>
        <div className="inc-meta" dangerouslySetInnerHTML={{ __html: meta }} />
        <div className="tags">
          {tags.map((t, i) => (
            <span key={i} className={`tag ${t.variant || 'tag-n'}`}>{t.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
