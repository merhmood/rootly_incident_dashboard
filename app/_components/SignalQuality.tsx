export function SignalQualitySection() {
  return (
    <>
      <div className="sec mb24">Signal Quality &amp; Noise Analysis</div>
      <div className="three-col fade-in">
        <div className="card">
          <div className="card-t">Overall Noise Rate</div>
          <div className="card-sub" style={{ marginBottom: '12px' }}>Week of Mar 13–19</div>
          <div style={{ fontSize: '38px', fontWeight: 600, fontFamily: 'var(--mono)', color: 'var(--y)', marginBottom: '4px' }}>37.5%</div>
          <div style={{ fontSize: '11px', color: 'var(--t2)', fontFamily: 'var(--mono)', marginBottom: '14px' }}>9 of 24 SEV1+SEV2 cancelled</div>
          <div className="noise-bar"><div className="noise-fill" style={{ width: '37.5%' }}></div></div>
          <div style={{ fontSize: '10px', color: 'var(--t3)', fontFamily: 'var(--mono)' }}>37.5% noise &nbsp;|&nbsp; 62.5% actionable signal</div>
          <div className="callout-y" style={{ marginTop: '14px' }}><b>TARGET:</b> Noise rate should be under 15%. Current rate is 2.5× that benchmark. Deduplication and alarm grouping improvements are the primary levers.</div>
        </div>
        <div className="card">
          <div className="card-t">Noise Breakdown</div>
          <div className="card-sub">By cancellation reason</div>
          <div className="mrow"><span className="mrow-lbl">Duplicate — SEV1</span><span className="mrow-val yel">2 incidents</span></div>
          <div className="mrow"><span className="mrow-lbl">Duplicate — SEV2</span><span className="mrow-val yel">5 incidents</span></div>
          <div className="mrow"><span className="mrow-lbl">False Positive — SEV2</span><span className="mrow-val red">2 incidents</span></div>
          <div className="mrow" style={{ paddingTop: '14px', marginTop: '6px', borderTop: '1px solid var(--b2)' }}><span className="mrow-lbl" style={{ fontWeight: 600 }}>Total noise</span><span className="mrow-val yel" style={{ fontWeight: 600 }}>9 incidents</span></div>
          <div style={{ marginTop: '14px' }}>
            <div style={{ fontSize: '10px', color: 'var(--t3)', fontFamily: 'var(--mono)', marginBottom: '6px' }}>Noisiest SLO by cancel count</div>
            <div className="mrow"><span className="mrow-lbl">1cp-composite-success-rate</span><span className="mrow-val red">3 dupes</span></div>
            <div className="mrow"><span className="mrow-lbl">morpheus_ai_llm_gw_error_rate</span><span className="mrow-val yel">2 dupes SEV1, 2 SEV2</span></div>
            <div className="mrow"><span className="mrow-lbl">data-fabric-queryengine-latency</span><span className="mrow-val yel">1 dupe</span></div>
          </div>
        </div>
        <div className="card">
          <div className="card-t">Incidents by Value Stream</div>
          <div className="card-sub">All SEV1 + SEV2 this week</div>
          <ValueStreamItem label="Morpheus" value="7" width="50px" color="var(--r)" />
          <ValueStreamItem label="PaaS" value="7" width="50px" color="var(--y)" />
          <ValueStreamItem label="ALM" value="4" width="29px" color="var(--bl)" />
          <ValueStreamItem label="Agentic Apps & Data" value="3" width="21px" color="var(--pu)" />
          <ValueStreamItem label="Production Eng." value="1" width="7px" color="var(--g)" />
          <ValueStreamItem label="Unassigned (N/A)" value="2" width="14px" color="var(--t3)" />
          <div className="callout-g" style={{ marginTop: '14px' }}><b>GOOD:</b> Production Engineering resolved its otel-collector incident in 0.06h — fastest recovery of the week.</div>
        </div>
      </div>
    </>
  );
}

function ValueStreamItem({ label, value, width, color }: { label: string, value: string, width: string, color: string }) {
    return (
        <div className="mrow">
            <span className="mrow-lbl">{label}</span>
            <span className="mrow-val" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ display: 'inline-block', width, height: '5px', background: 'var(--s3)', borderRadius: '3px', overflow: 'hidden' }}>
                    <span style={{ display: 'block', width: '100%', height: '100%', background: color }}></span>
                </span>
                {value}
            </span>
        </div>
    );
}
