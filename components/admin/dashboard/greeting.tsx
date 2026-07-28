// components/admin/dashboard/greeting.tsx
function getGreeting(hour: number): { text: string; emoji: string } {
  if (hour < 12) return { text: 'Good Morning', emoji: '☀️' }
  if (hour < 18) return { text: 'Good Afternoon', emoji: '🌤️' }
  return { text: 'Good Evening', emoji: '🌙' }
}

export function DashboardGreeting() {
  const hour = new Date().getHours()
  const { text, emoji } = getGreeting(hour)

  return (
    <div>
      <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl text-primary flex items-center gap-2">
        {text} <span aria-hidden="true">{emoji}</span>
      </h1>
      <p className="text-muted-foreground text-sm mt-1">
        Manage your crochet store from one place.
      </p>
    </div>
  )
}