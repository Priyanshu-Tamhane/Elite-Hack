"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { api } from "@/lib/api"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface EventAssistantProps {
  eventData: any
}

export function EventAssistant({ eventData }: EventAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const quickActions = [
    "Show registrations",
    "Ticket sales summary",
    "Today's schedule",
    "Send announcement"
  ]

  // Load chat history from localStorage on mount
  useEffect(() => {
    const chatKey = `ai_chat_${eventData?.slug || 'default'}`
    const savedChat = localStorage.getItem(chatKey)
    if (savedChat) {
      try {
        setMessages(JSON.parse(savedChat))
      } catch (e) {
        console.error('Failed to load chat history')
      }
    }
  }, [eventData?.slug])

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      const chatKey = `ai_chat_${eventData?.slug || 'default'}`
      localStorage.setItem(chatKey, JSON.stringify(messages))
    }
  }, [messages, eventData?.slug])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return

    const userMessage: Message = { role: "user", content: text }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const data = await api.sendAIMessage(text, eventData)
      const assistantMessage: Message = { role: "assistant", content: data.response }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Sorry, I encountered an error. Please try again." 
      }])
    } finally {
      setLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    const chatKey = `ai_chat_${eventData?.slug || 'default'}`
    localStorage.removeItem(chatKey)
  }

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 rounded-full shadow-lg z-50"
          size="lg"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          AI Assistant
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl flex flex-col z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h3 className="font-semibold">EventSphere AI Assistant</h3>
              <p className="text-xs text-muted-foreground">How can I help manage your event?</p>
            </div>
            <div className="flex gap-1">
              {messages.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={clearChat}
                  title="Clear chat"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-3">Quick actions:</p>
                {quickActions.map((action, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => sendMessage(action)}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            )}

            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                sendMessage(input)
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
              <Button type="submit" size="icon" disabled={loading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  )
}
