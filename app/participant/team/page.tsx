"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ExternalLink, MessageSquare, Copy, Pencil, Users, Mail, Clock, CheckCircle, AlertCircle, Trash2 } from "lucide-react"
import Link from "next/link"

const teamMembers = [
  {
    id: 1,
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Confirmed",
    role: "Leader",
    isLeader: true,
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "s.chen@tech.org",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Confirmed",
    role: "Member",
    isLeader: false,
  },
  {
    id: 3,
    name: "Marcus Thorne",
    email: "mthorne@design.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Pending",
    role: "Member",
    isLeader: false,
  },
]

const teamRules = [
  "A minimum of 2 members is required to participate in the hackathon.",
  "Maximum team size is 5 participants per the event policy.",
  "Teams with interdisciplinary roles (Design, Frontend, Backend) receive extra bonus points.",
  "Once the team is locked on May 15th, no further member swaps are allowed.",
]

export default function TeamManagementPage() {
  const [inviteEmail, setInviteEmail] = useState("")
  const [copied, setCopied] = useState(false)
  const joinCode = "AZ-9210"

  const copyJoinCode = () => {
    navigator.clipboard.writeText(joinCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Team Management</h1>
          <p className="text-muted-foreground mt-1">
            Collaborate, invite, and prepare for the Global AI Hackathon 2024.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/events/hackathon-2024">
              <ExternalLink className="h-4 w-4 mr-2" />
              Event Microsite
            </Link>
          </Button>
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Team Chat
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Team Info Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  C
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold">CyberVanguards</h2>
                    <Badge variant="outline">Active Squad</Badge>
                    <Button variant="ghost" size="sm">
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit Name
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                    <span>Join Code:</span>
                    <code className="bg-muted px-2 py-0.5 rounded font-mono">{joinCode}</code>
                    <Button variant="ghost" size="sm" className="h-6 px-2" onClick={copyJoinCode}>
                      <Copy className="h-3 w-3" />
                    </Button>
                    {copied && <span className="text-xs text-green-600">Copied!</span>}
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="font-semibold">Team Members</h3>
                  <Badge variant="secondary">{teamMembers.length}</Badge>
                </div>
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{member.name}</span>
                            {member.isLeader && <CheckCircle className="h-4 w-4 text-primary" />}
                          </div>
                          <span className="text-sm text-muted-foreground">{member.email}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={member.status === "Confirmed" ? "outline" : "secondary"}>
                          {member.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{member.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invite Member */}
              <div className="p-4 border-2 border-dashed rounded-lg">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="collaborator@example.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Invite Member
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Invitation links expire in 48 hours. Max 5 members allowed.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Team Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Team Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Team Capacity</span>
                  <span className="font-medium">3 / 5</span>
                </div>
                <Progress value={60} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Invite 2 more members to reach full capacity.</p>
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Leader Assigned
                  </span>
                  <span className="font-medium">Yes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Pending Invites
                  </span>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    Eligibility Status
                  </span>
                  <Badge variant="outline">Ready</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Team Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {teamRules.map((rule, index) => (
                  <li key={index} className="flex gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-muted-foreground">{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Leave Team */}
          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="pt-6">
              <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
                <Trash2 className="h-4 w-4 mr-2" />
                Leave this Team
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
