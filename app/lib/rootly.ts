export interface RootlyIncident {
  id: string;
  date: string;
  sev: string;
  slo: string;
  stream: string;
  status: 'started' | 'resolved' | 'closed' | 'cancelled';
  mttd: number;
  mitigation: number;
  resolution: number;
  systemWide: boolean;
  note: string;
  type: string;
}

const ROOTLY_API_KEY = process.env.ROOTLY_API_KEY;
const API_BASE_URL = 'https://api.rootly.com/v1';

export async function fetchRootlyIncidents(): Promise<RootlyIncident[]> {
  if (!ROOTLY_API_KEY) {
    console.warn("ROOTLY_API_KEY is not set. Using mock data.");
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/incidents?include=severity,services,environments&page[size]=50`, {
      headers: {
        'Authorization': `Bearer ${ROOTLY_API_KEY}`,
        'Content-Type': 'application/vnd.api+json'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Rootly API error: ${response.statusText}`);
    }

    const json = await response.json();
    return mapRootlyIncidents(json.data);
  } catch (error) {
    console.error("Error fetching incidents from Rootly:", error);
    return [];
  }
}

function mapRootlyIncidents(data: any[]): RootlyIncident[] {
  return data.map(item => {
    const attr = item.attributes;
    
    // Calculate durations in hours
    const started = new Date(attr.started_at);
    const acknowledged = attr.acknowledged_at ? new Date(attr.acknowledged_at) : null;
    const mitigated = attr.mitigated_at ? new Date(attr.mitigated_at) : null;
    const resolved = attr.resolved_at ? new Date(attr.resolved_at) : null;

    const mttd = acknowledged ? (acknowledged.getTime() - started.getTime()) / (1000 * 60 * 60) : 0;
    const mitigation = mitigated ? (mitigated.getTime() - started.getTime()) / (1000 * 60 * 60) : 0;
    const resolution = resolved ? (resolved.getTime() - started.getTime()) / (1000 * 60 * 60) : 0;

    // Map severity
    let sev = 'SEV2';
    if (attr.severity_name?.toLowerCase().includes('critical') || attr.severity_name?.toLowerCase().includes('1')) sev = 'SEV1';
    else if (attr.severity_name?.toLowerCase().includes('high') || attr.severity_name?.toLowerCase().includes('2')) sev = 'SEV2';
    else if (attr.severity_name?.toLowerCase().includes('medium') || attr.severity_name?.toLowerCase().includes('3')) sev = 'SEV3';
    else if (attr.severity_name?.toLowerCase().includes('low') || attr.severity_name?.toLowerCase().includes('4')) sev = 'SEV4';

    return {
      id: item.id,
      date: attr.started_at.split('T')[0],
      sev: sev,
      slo: attr.title.length > 30 ? attr.title.substring(0, 27) + '...' : attr.title,
      stream: 'Unassigned', // Rootly might not have a direct "Value Stream" field without custom fields
      status: attr.status as any,
      mttd: Number(mttd.toFixed(2)),
      mitigation: Number(mitigation.toFixed(2)),
      resolution: Number(resolution.toFixed(2)),
      systemWide: false, // Default to false
      note: attr.summary || '',
      type: 'Incident'
    };
  });
}
