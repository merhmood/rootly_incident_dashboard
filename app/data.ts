import { RootlyIncident } from "./lib/rootly";

export const incidents: RootlyIncident[] = [
  {id:'m1', date:'2026-03-19',sev:'SEV1',slo:'morpheus_ai_llm_gw_error_rate',stream:'Morpheus',status:'started',mttd:0,mitigation:0,resolution:0,systemWide:false,note:'Active now',type:'System-wide SLO'},
  {id:'m2', date:'2026-03-14',sev:'SEV1',slo:'morpheus_ai_llm_gw_error_rate',stream:'Morpheus',status:'cancelled',mttd:0,mitigation:0,resolution:0,systemWide:false,note:'Duplicated',type:'Grafana'},
  {id:'m3', date:'2026-03-14',sev:'SEV1',slo:'morpheus_ai_llm_gw_error_rate',stream:'Morpheus',status:'closed',mttd:0,mitigation:0.8,resolution:1.31,systemWide:false,note:'',type:'System-wide SLO'},
  {id:'m4', date:'2026-03-14',sev:'SEV1',slo:'tenant-provisioning-success-rate',stream:'PaaS',status:'resolved',mttd:0,mitigation:4.09,resolution:4.09,systemWide:true,note:'Customer impact confirmed',type:'Customer Escalated'},
  {id:'m5', date:'2026-03-13',sev:'SEV1',slo:'morpheus_ai_llm_gw_error_rate',stream:'Morpheus',status:'cancelled',mttd:0,mitigation:0,resolution:0,systemWide:false,note:'Duplicated',type:'Grafana'},
  {id:'m6', date:'2026-03-13',sev:'SEV1',slo:'morpheus_ai_llm_gw_error_rate',stream:'Morpheus',status:'closed',mttd:0,mitigation:1.34,resolution:61.12,systemWide:false,note:'⚠ 61h outlier',type:'System-wide SLO'},
  {id:'m7', date:'2026-03-19',sev:'SEV2',slo:'tenant-provisioning-success-rate',stream:'PaaS',status:'started',mttd:0,mitigation:0,resolution:0,systemWide:false,note:'Active now',type:'Manually Created'},
  {id:'m8', date:'2026-03-18',sev:'SEV2',slo:'nats-availability',stream:'N/A',status:'started',mttd:0,mitigation:0,resolution:0,systemWide:false,note:'Active now',type:'Grafana'},
  {id:'m9', date:'2026-03-18',sev:'SEV2',slo:'tenant-provisioning-success-rate',stream:'PaaS',status:'cancelled',mttd:0,mitigation:0,resolution:0,systemWide:false,note:'False positive',type:'System-wide SLO'},
  {id:'m10', date:'2026-03-18',sev:'SEV2',slo:'tenant-provisioning-success-rate',stream:'PaaS',status:'resolved',mttd:0,mitigation:1.7,resolution:1.7,systemWide:false,note:'',type:'Customer Escalated'},
  {id:'m11', date:'2026-03-18',sev:'SEV2',slo:'tlc-composite-success-rate',stream:'PaaS',status:'resolved',mttd:0,mitigation:0.2,resolution:0.2,systemWide:false,note:'',type:'System-wide SLO'},
  {id:'m12', date:'2026-03-17',sev:'SEV2',slo:'data-fabric-queryengine-availability',stream:'Agentic Apps & Data',status:'closed',mttd:0,mitigation:0.62,resolution:0.62,systemWide:false,note:'',type:'Grafana'},
  {id:'m13', date:'2026-03-16',sev:'SEV2',slo:'1cp-composite-success-rate',stream:'ALM',status:'cancelled',mttd:0,mitigation:0,resolution:0,systemWide:false,note:'Duplicated',type:'Grafana'},
  {id:'m14', date:'2026-03-16',sev:'SEV2',slo:'tlc-composite-success-rate',stream:'PaaS',status:'closed',mttd:0,mitigation:0.48,resolution:0.48,systemWide:false,note:'',type:'System-wide SLO'},
  {id:'m15', date:'2026-03-16',sev:'SEV2',slo:'1cp-composite-success-rate',stream:'ALM',status:'cancelled',mttd:0,mitigation:0,resolution:0,systemWide:false,note:'Duplicated',type:'Grafana'},
  {id:'m16', date:'2026-03-16',sev:'SEV2',slo:'1cp-composite-success-rate',stream:'ALM',status:'cancelled',mttd:0,mitigation:0,resolution:0,systemWide:false,note:'Duplicated',type:'Grafana'},
  {id:'m17', date:'2026-03-16',sev:'SEV2',slo:'1cp-composite-success-rate',stream:'ALM',status:'resolved',mttd:0,mitigation:1.75,resolution:3.63,systemWide:true,note:'Customer impact confirmed',type:'Customer Escalated'},
  {id:'m18', date:'2026-03-15',sev:'SEV2',slo:'otel-collector-availability',stream:'Production Eng.',status:'closed',mttd:0,mitigation:0.05,resolution:0.06,systemWide:false,note:'Fastest resolution',type:'Grafana'},
  {id:'m19', date:'2026-03-14',sev:'SEV2',slo:'morpheus_ai_llm_gw_error_rate',stream:'Morpheus',status:'cancelled',mttd:0,mitigation:0,resolution:0,systemWide:false,note:'Duplicated',type:'Grafana'},
  {id:'m20', date:'2026-03-14',sev:'SEV2',slo:'morpheus_ai_llm_gw_error_rate',stream:'Morpheus',status:'cancelled',mttd:0,mitigation:0,resolution:0,systemWide:false,note:'Duplicated',type:'Grafana'},
  {id:'m21', date:'2026-03-13',sev:'SEV2',slo:'data-fabric-queryengine-latency',stream:'Agentic Apps & Data',status:'cancelled',mttd:0,mitigation:0,resolution:0,systemWide:false,note:'Duplicated',type:'System-wide SLO'},
  {id:'m22', date:'2026-03-13',sev:'SEV2',slo:'data-fabric-queryengine-latency',stream:'Agentic Apps & Data',status:'closed',mttd:0,mitigation:0.58,resolution:2.35,systemWide:false,note:'',type:'System-wide SLO'},
  {id:'m23', date:'2026-03-12',sev:'SEV2',slo:'agent_workbench_list_delete_latency',stream:'Agentic Apps & Data',status:'cancelled',mttd:0,mitigation:0,resolution:0,systemWide:false,note:'False positive',type:'Manually Created'},
  {id:'m24', date:'2026-03-12',sev:'SEV2',slo:'tenant-provisioning-success-rate',stream:'PaaS',status:'resolved',mttd:0,mitigation:0.68,resolution:0.68,systemWide:false,note:'',type:'System-wide SLO'},
];

export const sloChartData = {
  labels: [
    'morpheus llm_gw_error_rate',
    'tenant-provisioning',
    '1cp-composite',
    'data-fabric-queryengine',
    'tlc-composite',
    'nats-availability',
    'otel-collector-avail',
    'agent_workbench_latency'
  ],
  sev1: [4, 1, 0, 0, 0, 0, 0, 0],
  sev2: [2, 4, 4, 2, 2, 1, 1, 1]
};

export const opsAlertsData = {
  labels: ['2026-03-12', '2026-03-13', '2026-03-14', '2026-03-15', '2026-03-16', '2026-03-17', '2026-03-18', '2026-03-19'],
  alerts: [2, 3, 5, 1, 3, 2, 4, 2]
};

export const responderData = {
  labels: ['None', 'Jason Crews', 'Luis Rocha', 'Sam Audu', 'Jeg Subramaniam', 'Rootly', 'Berkay Hidiroglu', 'Vasco Gomes', 'Kevin Tek', 'Kishore Kamath', 'William Hindes', 'André Rosendo', 'Hakim Jawrawala'],
  values: [4, 12, 8, 5, 3, 4, 2, 6, 4, 2, 3, 1, 2],
  colors: [
    '#2d333b', '#f85149', '#e3b341', '#3fb950', '#58a6ff', 
    '#c084fc', '#8b949e', '#f8a149', '#a149f8', '#49f8e3', 
    '#f849a1', '#f8f849', '#49f849'
  ]
};

export const severityDistributionData = {
  labels: ['SEV1 (Critical)', 'SEV2 (High)', 'SEV3 (Med)', 'SEV4 (Low)'],
  values: [6, 18, 12, 5],
  colors: ['#f85149', '#e3b341', '#58a6ff', '#3fb950']
};
