import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  icon?: LucideIcon
  trend?: {
    value: string
    direction: "up" | "down"
    label?: string
  }
  className?: string
}

export function StatsCard({ title, value, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            {trend && (
              <div className="flex items-center gap-1 text-xs">
                {trend.direction === "up" ? (
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
                <span className={trend.direction === "up" ? "text-emerald-500" : "text-destructive"}>
                  {trend.value}
                </span>
                {trend.label && <span className="text-muted-foreground">{trend.label}</span>}
              </div>
            )}
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          {Icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <Icon className="h-5 w-5 text-accent-foreground" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
