import React, { Suspense } from 'react';

// Dynamically import the entire recharts module and use its named exports at runtime
const Recharts = React.lazy(() => import('recharts'));

const LazyAreaChart: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading chart...</div>}>
      <Recharts>
        {/** @ts-ignore - dynamic module usage */}
        <Recharts.ResponsiveContainer width="100%" height="100%">
          {/** @ts-ignore */}
          <Recharts.AreaChart data={data}>
            <defs>
              <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            {/** @ts-ignore */}
            <Recharts.CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            {/** @ts-ignore */}
            <Recharts.XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
            {/** @ts-ignore */}
            <Recharts.YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
            {/** @ts-ignore */}
            <Recharts.Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
            {/** @ts-ignore */}
            <Recharts.Area type="monotone" dataKey="calls" stroke="#6366f1" strokeWidth={4} fill="url(#colorCalls)" />
          </Recharts.AreaChart>
        </Recharts.ResponsiveContainer>
      </Recharts>
    </Suspense>
  );
};

export default LazyAreaChart;
