import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Code, Heart, Calendar } from "lucide-react"

export default function MicrositesPage() {
  const microsites = [
    {
      name: "Corporate Event",
      description: "Professional corporate conference and workshop microsites",
      icon: Building,
      href: "/corporate-demo",
      color: "bg-blue-500"
    },
    {
      name: "Hackathon",
      description: "Coding competition and developer event microsites",
      icon: Code,
      href: "/hackathon-demo",
      color: "bg-green-500"
    },
    {
      name: "Wedding",
      description: "Elegant wedding invitation and celebration microsites",
      icon: Heart,
      href: "/wedding-demo",
      color: "bg-pink-500"
    },
    {
      name: "Default Event",
      description: "General purpose event microsites for any occasion",
      icon: Calendar,
      href: "/default-demo",
      color: "bg-purple-500"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Event Microsites</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of professional event microsites. Each microsite is fully responsive
            and customizable for different types of events.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {microsites.map((microsite) => {
            const Icon = microsite.icon
            return (
              <Card key={microsite.name} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${microsite.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{microsite.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-6">{microsite.description}</p>
                  <Button asChild className="w-full">
                    <Link href={microsite.href}>View Demo</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Create Your Own Event</h2>
            <p className="text-muted-foreground mb-6">
              Ready to create your own professional event microsite? Start building your event today.
            </p>
            <Button size="lg" asChild>
              <Link href="/dashboard/events/create/details">Create Event</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}