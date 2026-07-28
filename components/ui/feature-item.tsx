// components/ui/feature-item.tsx
// Extracted from the inline FooterFeature component in app/admin/login/page.tsx
// so it can be reused by the public FeatureHighlights section too.
export function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="shrink-0 text-primary mt-0.5">{icon}</span>
      <div>
        <p className="text-sm font-semibold text-primary">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}