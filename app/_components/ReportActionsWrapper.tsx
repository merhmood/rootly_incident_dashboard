'use client';

import dynamic from "next/dynamic";
import React from "react";

const ReportActionsInternal = dynamic(
  () => import("./ReportActions").then(mod => mod.ReportActions),
  {
    ssr: false,
    loading: () => <div className="fbtn dimmed" style={{ padding: '6px 14px', fontSize: '11px' }}>Loading...</div>
  }
);

export function ReportActionsWrapper() {
  return <ReportActionsInternal />;
}
