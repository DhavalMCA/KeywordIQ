"use client"

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import type { InterestDataPoint } from "@/lib/validators"

interface InterestGraphProps {
  data: InterestDataPoint[]
  keyword: string
}

export function InterestGraph({ data, keyword }: InterestGraphProps) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/10 p-8 rounded-3xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
             <span className="material-symbols-outlined text-xs text-primary">timeline</span>
             <h2 className="text-[10px] font-black  font-headline text-on-background uppercase">
               Interest Velocity
             </h2>
          </div>
          <p className="text-[8px] font-medium font-body text-on-background/50 pl-6">Google Trends Aggregator V4.2</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-2 py-1 bg-background border border-outline-variant/5 rounded-md">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[8px] font-mono text-on-background/60 font-bold">Active Stream</span>
           </div>
        </div>
      </div>
      
      {data.length === 0 ? (
        <div className="h-[350px] flex flex-col items-center justify-center border border-dashed border-outline-variant/10 bg-background/50 rounded-2xl">
          <span className="material-symbols-outlined text-outline-variant/20 text-3xl mb-4">analytics</span>
          <p className="text-[10px] font-mono text-on-background/50">
            Insufficient variance for &ldquo;{keyword}&rdquo;
          </p>
        </div>
      ) : (
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--outline-variant))" vertical={false} opacity={0.1} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 9, fill: "hsl(var(--on-background))", opacity: 0.2, fontFamily: "var(--font-jetbrains-mono)", fontWeight: 700 }}
                axisLine={false}
                tickLine={false}
                dy={15}
                tickFormatter={(val) => {
                  const d = new Date(val)
                  return `${d.getMonth() + 1}/${d.getFullYear().toString().slice(-2)}`
                }}
              />
              <YAxis 
                tick={{ fontSize: 9, fill: "hsl(var(--on-background))", opacity: 0.2, fontFamily: "var(--font-jetbrains-mono)", fontWeight: 700 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-surface-container border border-outline-variant/20 p-4 rounded-xl shadow-2xl backdrop-blur-md">
                        <p className="text-[8px] font-black text-on-background/50 mb-2 font-mono">
                          {new Date(label).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                        <div className="flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                           <span className="text-sm font-black font-headline text-on-background">
                              {payload[0].value}%
                           </span>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorValue)"
                animationDuration={2000}
                animationEasing="ease-in-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
      
      <div className="mt-8 flex items-center justify-between pt-6 border-t border-outline-variant/5">
         <div className="flex gap-8">
            <div className="flex flex-col gap-1">
               <span className="text-[8px] font-black text-on-background/50">Avg Growth</span>
               <span className="text-[10px] font-mono text-secondary font-bold tracking-widest">+12.4%</span>
            </div>
            <div className="flex flex-col gap-1">
               <span className="text-[8px] font-black text-on-background/50">Volatility</span>
               <span className="text-[10px] font-mono text-on-background/60 font-bold tracking-widest italic">LOW</span>
            </div>
         </div>
         <span className="text-[8px] font-bold text-on-background/10  italic font-body">Source: Index_v4_Direct_Channel</span>
      </div>
    </div>
  )
}
