"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  User, Users, UserPlus, CreditCard, Building, MapPin, Clock, 
  CheckCircle, Shield, ArrowRight, ChevronLeft, Bell, Globe
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const steps = [
  { id: 1, label: "Profile", icon: User },
  { id: 2, label: "Team", icon: Users },
  { id: 3, label: "Accommodation", icon: Building },
  { id: 4, label: "Payment", icon: CreditCard },
]

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    participationType: "individual",
    requestAccommodation: false,
    acceptTerms: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-primary">EventSphere</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Alex Rivera</span>
                <span className="text-xs text-muted-foreground">participant</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-2">Finalizing Registration</Badge>
          <h1 className="text-3xl font-bold mb-2">Complete Your Journey</h1>
          <p className="text-muted-foreground">
            You're just a few steps away from joining the <strong>TechNova Hackathon 2024</strong>. Secure your spot now!
          </p>
        </div>

        {/* Step Progress */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    currentStep >= step.id 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className={`text-xs mt-1 ${currentStep >= step.id ? "text-primary" : "text-muted-foreground"}`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 w-16 mx-2 ${
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Participant Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Participant Details
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  We'll use this information for your event badge and communications.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Alex"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Rivera"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Work/School Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="alex.rivera@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <Input className="w-16" defaultValue="+1" />
                    <Input
                      id="phone"
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button onClick={() => setCurrentStep(2)}>
                    Save & Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Team Participation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Team Participation
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Collaborate with others or lead your own squad.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={formData.participationType}
                  onValueChange={(value) => handleInputChange("participationType", value)}
                  className="grid grid-cols-3 gap-4"
                >
                  {[
                    { value: "individual", icon: User, label: "Individual" },
                    { value: "create", icon: UserPlus, label: "Create Team" },
                    { value: "join", icon: Users, label: "Join Team" },
                  ].map((option) => (
                    <Label
                      key={option.value}
                      htmlFor={option.value}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        formData.participationType === option.value
                          ? "border-primary bg-accent"
                          : "border-muted hover:border-muted-foreground/50"
                      }`}
                    >
                      <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                      <option.icon className="h-6 w-6" />
                      <span className="text-sm font-medium">{option.label}</span>
                    </Label>
                  ))}
                </RadioGroup>
                <div className="flex justify-between pt-2">
                  <Button variant="ghost" onClick={() => setCurrentStep(1)}>Back</Button>
                  <Button onClick={() => setCurrentStep(3)}>
                    Save & Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Accommodation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Accommodation & Stay
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Need a place to rest between coding sessions?
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">Request On-Campus Housing</p>
                    <p className="text-sm text-muted-foreground">Limited spots available in the university dormitories.</p>
                  </div>
                  <Switch
                    checked={formData.requestAccommodation}
                    onCheckedChange={(checked) => handleInputChange("requestAccommodation", checked)}
                  />
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Venue Information</p>
                    <p className="text-sm text-muted-foreground">
                      The Hackathon takes place at <strong>Innovation Hall, Tech District</strong>. Check-in starts at 9:00 AM on August 15th.
                    </p>
                  </div>
                </div>
                <div className="flex justify-between pt-2">
                  <Button variant="ghost" onClick={() => setCurrentStep(2)}>Back</Button>
                  <Button onClick={() => setCurrentStep(4)}>
                    Proceed to Payment
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
              />
              <div>
                <Label htmlFor="terms" className="font-medium cursor-pointer">
                  Accept terms and conditions
                </Label>
                <p className="text-sm text-muted-foreground">
                  By checking this box, you agree to our Code of Conduct and Privacy Policy regarding data handling for the event.
                </p>
              </div>
            </div>
          </div>

          {/* Registration Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Registration Summary
                </CardTitle>
                <p className="text-sm text-muted-foreground">TechNova Hackathon 2024</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Early Bird Access</span>
                    <span>$149.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform Service Fee</span>
                    <span>$15.00</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">$164.00</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg text-sm">
                  <Shield className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <p className="text-muted-foreground">
                    Secure checkout powered by Razorpay. Your payment information is encrypted and never stored on our servers.
                  </p>
                </div>

                <Button className="w-full" size="lg" disabled={!formData.acceptTerms}>
                  Confirm & Pay
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  By clicking pay, you agree to the EventSphere Terms of Service and Refund Policy.
                </p>

                <div className="flex justify-center gap-4 pt-2">
                  <img src="/placeholder.svg?height=24&width=40" alt="Razorpay" className="h-6 opacity-60" />
                  <img src="/placeholder.svg?height=24&width=40" alt="Stripe" className="h-6 opacity-60" />
                  <img src="/placeholder.svg?height=24&width=40" alt="UPI" className="h-6 opacity-60" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-6 mt-12">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>2024 EventSphere. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground">System Status</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
