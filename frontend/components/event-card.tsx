import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, ExternalLink } from "lucide-react"

interface EventCardProps {
  id: string
  title: string
  image: string
  date: string
  location: string
  team?: string
  status?: "upcoming" | "active" | "past"
  showActions?: boolean
}

export function EventCard({
  id,
  title,
  image,
  date,
  location,
  team,
  status = "upcoming",
  showActions = true,
}: EventCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        {status && (
          <Badge
            className="absolute right-3 top-3"
            variant={status === "active" ? "default" : "secondary"}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        <div className="mt-3 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{location}</span>
          </div>
          {team && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Team: {team}</span>
            </div>
          )}
        </div>
        {showActions && (
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link href={`/microsite/${id}`}>
                <ExternalLink className="mr-1.5 h-4 w-4" />
                Microsite
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link href={`/participant/teams`}>
                <Users className="mr-1.5 h-4 w-4" />
                Team
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
