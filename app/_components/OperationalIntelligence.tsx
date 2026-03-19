"use client";

import { useEffect, useRef } from "react";
import { opsAlertsData, responderData, severityDistributionData } from "../data";

export function OperationalIntelligence() {
  return (
    <section className="fade-in" style={{ marginBottom: '32px' }}>
      <div className="sec mb24">Operational Intelligence</div>
      <div className="three-col">
        <OpsAlertsPerDay />
        <OpsAlertResponders />
        <IncidentsBySeverity />
      </div>
    </section>
  );
}

function OpsAlertsPerDay() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    const initChart = () => {
      if (!window.Chart || !chartRef.current) return false;
      if (chartInstance.current) chartInstance.current.destroy();

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: opsAlertsData.labels,
          datasets: [{
            label: 'Alerts',
            data: opsAlertsData.alerts,
            backgroundColor: 'rgba(248, 81, 73, 0.75)',
            borderRadius: 4,
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#6e7681', font: { family: 'IBM Plex Mono', size: 10 } }
            },
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              ticks: { color: '#6e7681', font: { family: 'IBM Plex Mono', size: 10 }, stepSize: 1 }
            }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#21262d',
              borderColor: 'rgba(255, 255, 255, 0.13)',
              borderWidth: 1,
              titleFont: { family: 'IBM Plex Mono' },
              bodyFont: { family: 'IBM Plex Mono' }
            }
          }
        }
      });
      return true;
    };

    const interval = setInterval(() => {
      if (initChart()) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <div className="card-t">Ops Alerts per day</div>
      <div className="card-sub">Last 8 days alert volume</div>
      <div style={{ height: '180px', position: 'relative' }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}

function OpsAlertResponders() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    const initChart = () => {
      if (!window.Chart || !chartRef.current) return false;
      if (chartInstance.current) chartInstance.current.destroy();

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new window.Chart(ctx, {
        type: 'pie',
        data: {
          labels: responderData.labels,
          datasets: [{
            data: responderData.values,
            backgroundColor: responderData.colors,
            borderWidth: 1,
            borderColor: '#0d1117'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#8b949e',
                font: { family: 'IBM Plex Mono', size: 9 },
                boxWidth: 8,
                padding: 10,
                usePointStyle: true
              }
            },
            tooltip: {
              backgroundColor: '#21262d',
              borderColor: 'rgba(255, 255, 255, 0.13)',
              borderWidth: 1
            }
          }
        }
      });
      return true;
    };

    const interval = setInterval(() => {
      if (initChart()) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <div className="card-t">Ops Alert Responders</div>
      <div className="card-sub">Primary responder distribution</div>
      <div style={{ height: '220px', position: 'relative' }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}

function IncidentsBySeverity() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    const initChart = () => {
      if (!window.Chart || !chartRef.current) return false;
      if (chartInstance.current) chartInstance.current.destroy();

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new window.Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: severityDistributionData.labels,
          datasets: [{
            data: severityDistributionData.values,
            backgroundColor: severityDistributionData.colors,
            borderWidth: 1,
            borderColor: '#0d1117',
            cutout: '60%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#8b949e',
                font: { family: 'IBM Plex Mono', size: 10 },
                boxWidth: 12,
                padding: 15
              }
            }
          }
        }
      });
      return true;
    };

    const interval = setInterval(() => {
      if (initChart()) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <div className="card-t">Incidents by Severity</div>
      <div className="card-sub">All-time volume distribution</div>
      <div style={{ height: '220px', position: 'relative' }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}
