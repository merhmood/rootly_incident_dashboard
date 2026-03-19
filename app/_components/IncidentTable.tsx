"use client";

import { useState } from "react";
import { incidents } from "../data";

export function IncidentTable() {
  const [filter, setFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredIncidents = incidents.filter((i: any) => {
    let matchGeneral = true;
    if (filter === "sev1") matchGeneral = i.sev === "SEV1";
    else if (filter === "sev2") matchGeneral = i.sev === "SEV2";
    else if (filter === "active") matchGeneral = i.status === "started";
    else if (filter === "impact") matchGeneral = i.systemWide;
    else if (filter === "noise") matchGeneral = i.status === "cancelled";

    let matchType = true;
    if (typeFilter !== "all") matchType = i.type === typeFilter;

    return matchGeneral && matchType;
  });

  const incidentTypes = ["System-wide SLO", "Customer Escalated", "Manually Created", "Grafana"];

  return (
    <>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '10px', color: 'var(--t3)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '.5px' }}>General Filter</div>
        <div className="filter-row" style={{ marginBottom: '16px' }}>
          <button className={`fbtn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All ({incidents.length})</button>
          <button className={`fbtn f-sev1 ${filter === 'sev1' ? 'active' : ''}`} onClick={() => setFilter('sev1')}>SEV1 only</button>
          <button className={`fbtn f-sev2 ${filter === 'sev2' ? 'active' : ''}`} onClick={() => setFilter('sev2')}>SEV2 only</button>
          <button className={`fbtn ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Active</button>
          <button className={`fbtn ${filter === 'impact' ? 'active' : ''}`} onClick={() => setFilter('impact')}>System-wide</button>
          <button className={`fbtn ${filter === 'noise' ? 'active' : ''}`} onClick={() => setFilter('noise')}>Noise only</button>
        </div>

        <div style={{ fontSize: '10px', color: 'var(--t3)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '.5px' }}>Filter by Incident Type</div>
        <div className="filter-row">
          <button className={`fbtn ${typeFilter === 'all' ? 'active' : ''}`} onClick={() => setTypeFilter('all')}>All Types</button>
          {incidentTypes.map(t => (
            <button key={t} className={`fbtn ${typeFilter === t ? 'active' : ''}`} onClick={() => setTypeFilter(t)}>{t}</button>
          ))}
        </div>
      </div>

      <div className="tbl-wrap">
        <table className="itbl">
          <thead>
            <tr>
              <th>Date</th><th>Sev</th><th>Type</th><th>SLO / Title</th><th>Stream</th>
              <th>Status</th><th>MTTD</th><th>Mitig (h)</th><th>Resol (h)</th>
              <th>Sys-Wide</th><th>Note</th>
            </tr>
          </thead>
          <tbody>
            {filteredIncidents.map((i: any, idx: number) => (
              <tr key={idx} className={i.status === 'cancelled' ? 'dimmed' : ''}>
                <td>{i.date.substring(5)}</td>
                <td><span className={`chip ${i.sev === 'SEV1' ? 'chip-s1' : 'chip-s2'}`}>{i.sev}</span></td>
                <td><span style={{ fontSize: '10px', color: 'var(--t2)', background: 'var(--s3)', padding: '2px 6px', borderRadius: '3px' }}>{i.type}</span></td>
                <td style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis' }} title={i.slo}>{i.slo}</td>
                <td>{i.stream}</td>
                <td><StatusChip status={i.status} /></td>
                <td>0.0</td>
                <td>{i.status === 'started' ? <span style={{ color: 'var(--r)' }}>live</span> : (i.mitigation ? i.mitigation.toFixed(2) : '—')}</td>
                <td>{i.status === 'started' ? <span style={{ color: 'var(--r)' }}>live</span> : (i.resolution ? i.resolution.toFixed(2) : '—')}</td>
                <td>{i.systemWide ? <><span className="impact-dot"></span>Yes</> : '—'}</td>
                <td style={{ color: 'var(--t3)' }}>{i.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function StatusChip({ status }: { status: string }) {
    const m: Record<string, string> = {
        resolved: 'chip-res',
        closed: 'chip-cld',
        started: 'chip-sta',
        cancelled: 'chip-can'
    };
    return (
        <span className={`chip ${m[status] || 'chip-can'}`}>
            {status}
        </span>
    );
}
