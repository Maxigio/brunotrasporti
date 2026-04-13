'use client'
import dynamic from 'next/dynamic'

// Recharts uses window/ResizeObserver which are unavailable during SSR.
// This client component wrapper loads both charts dynamically with ssr:false.

const ServizioChart = dynamic(() => import('@/components/admin/ServizioChart'), {
  ssr: false,
  loading: () => <ChartSkeleton />,
})
const TrendChart = dynamic(() => import('@/components/admin/TrendChart'), {
  ssr: false,
  loading: () => <ChartSkeleton />,
})

function ChartSkeleton() {
  return (
    <div className="h-64 flex items-center justify-center">
      <div className="w-6 h-6 rounded-full border-2 border-brand-300 border-t-brand-700 animate-spin" />
    </div>
  )
}

export default function AdminCharts({ perServizio, trend }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-4">Richieste per servizio</h2>
        <ServizioChart data={perServizio} />
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-4">Andamento ultime 8 settimane</h2>
        <TrendChart data={trend} />
      </div>
    </div>
  )
}
