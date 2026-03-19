"use client";

import { useEffect, useRef } from "react";
import { sloChartData } from "../data";

declare global {
  interface Window {
    Chart: any;
  }
}

export function SloChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    const initChart = () => {
      if (!window.Chart || !chartRef.current) return false;

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: sloChartData.labels,
          datasets: [
            {
              label: 'SEV1',
              data: sloChartData.sev1,
              backgroundColor: 'rgba(248, 81, 73, 0.75)',
              borderColor: 'rgba(248, 81, 73, 0)',
              borderWidth: 0,
              borderRadius: 3
            },
            {
              label: 'SEV2',
              data: sloChartData.sev2,
              backgroundColor: 'rgba(227, 179, 65, 0.65)',
              borderColor: 'rgba(227, 179, 65, 0)',
              borderWidth: 0,
              borderRadius: 3
            }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true,
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              ticks: { color: '#6e7681', font: { family: 'IBM Plex Mono', size: 11 } },
              border: { color: 'rgba(255, 255, 255, 0.05)' }
            },
            y: {
              stacked: true,
              grid: { display: false },
              ticks: { color: '#8b949e', font: { family: 'IBM Plex Mono', size: 11 }, autoSkip: false },
              border: { display: false }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'start',
              labels: {
                color: '#8b949e',
                font: { family: 'IBM Plex Mono', size: 11 },
                boxWidth: 12,
                boxHeight: 12,
                borderRadius: 2,
                useBorderRadius: true,
                padding: 16
              }
            },
            tooltip: {
              backgroundColor: '#21262d',
              borderColor: 'rgba(255, 255, 255, 0.13)',
              borderWidth: 1,
              titleColor: '#e6edf3',
              bodyColor: '#8b949e',
              titleFont: { family: 'IBM Plex Mono' },
              bodyFont: { family: 'IBM Plex Mono', size: 11 },
              callbacks: {
                label: (ctx: any) => `  ${ctx.dataset.label}: ${ctx.parsed.x} incidents`
              }
            }
          }
        }
      });
      return true;
    };

    if (!initChart()) {
      const interval = setInterval(() => {
        if (initChart()) clearInterval(interval);
      }, 100);
      return () => clearInterval(interval);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="card mb32">
      <div className="card-t">Top SLOs by Incident Count This Week</div>
      <div className="card-sub" style={{ marginBottom: '16px' }}>Stacked SEV1 (red) + SEV2 (amber) — includes cancelled/noise</div>
      <div style={{ position: 'relative', width: '100%', height: '260px' }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}
