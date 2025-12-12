"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageCircle,
  X,
  Send,
  Paperclip,
  Phone,
  Mail,
  Clock,
  Minimize2,
  Maximize2,
  User,
  Bot,
  Headphones,
  Star,
} from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "agent" | "bot"
  timestamp: Date
  type?: "text" | "quick-reply" | "file" | "system"
  agentName?: string
  agentAvatar?: string
}

interface QuickReply {
  id: string
  text: string
  category: string
}

const quickReplies: QuickReply[] = [
  { id: "1", text: "How do I start trading?", category: "trading" },
  { id: "2", text: "Account verification help", category: "account" },
  { id: "3", text: "Deposit/Withdrawal issues", category: "payments" },
  { id: "4", text: "Security concerns", category: "security" },
  { id: "5", text: "Platform technical issues", category: "technical" },
  { id: "6", text: "Fee information", category: "fees" },
]

const supportAgents = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    speciality: "Trading Support",
    rating: 4.9,
  },
  {
    id: "2",
    name: "Mike Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    speciality: "Technical Support",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Emma Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "busy",
    speciality: "Account Management",
    rating: 4.9,
  },
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentAgent, setCurrentAgent] = useState(supportAgents[0])
  const [chatStatus, setChatStatus] = useState<"waiting" | "connected" | "ended">("waiting")
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize chat with welcome message
      const welcomeMessage: Message = {
        id: "welcome",
        text: "Hi! I'm here to help you with any questions about Emax Protocol. How can I assist you today?",
        sender: "bot",
        timestamp: new Date(),
        type: "text",
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setUnreadCount((prev) => prev + 1)
    }
  }, [messages, isOpen])

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0)
    }
  }, [isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate agent response
    setTimeout(() => {
      setIsTyping(false)
      if (chatStatus === "waiting") {
        setChatStatus("connected")
      }

      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAgentResponse(inputValue),
        sender: "agent",
        timestamp: new Date(),
        type: "text",
        agentName: currentAgent.name,
        agentAvatar: currentAgent.avatar,
      }
      setMessages((prev) => [...prev, agentResponse])
    }, 1500)
  }

  const getAgentResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("trading") || input.includes("trade")) {
      return "I'd be happy to help you with trading! Our platform offers automated trading with daily returns. You can start with as little as $100. Would you like me to guide you through the account setup process?"
    }

    if (input.includes("deposit") || input.includes("withdrawal")) {
      return "For deposits and withdrawals, we support multiple payment methods including bank transfers, credit cards, and cryptocurrency. Processing times vary from instant to 3-5 business days. What specific payment method are you interested in?"
    }

    if (input.includes("security") || input.includes("safe")) {
      return "Security is our top priority. We use bank-grade encryption, 2FA authentication, cold storage for funds, and are fully regulated. Your investments are protected by our insurance fund. Is there a specific security concern I can address?"
    }

    if (input.includes("fee") || input.includes("cost")) {
      return "Our fee structure is transparent: 0% deposit fees, competitive trading fees starting at 0.1%, and withdrawal fees vary by method. We also offer reduced fees for high-volume traders. Would you like detailed fee information?"
    }

    return "Thank you for your question! I'm reviewing your inquiry and will provide you with detailed information. In the meantime, you can also check our FAQ section or schedule a call with our specialists."
  }

  const handleQuickReply = (reply: QuickReply) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: reply.text,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate agent response
    setTimeout(() => {
      setIsTyping(false)
      if (chatStatus === "waiting") {
        setChatStatus("connected")
      }

      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAgentResponse(reply.text),
        sender: "agent",
        timestamp: new Date(),
        type: "text",
        agentName: currentAgent.name,
        agentAvatar: currentAgent.avatar,
      }
      setMessages((prev) => [...prev, agentResponse])
    }, 1500)
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileMessage: Message = {
        id: Date.now().toString(),
        text: `Uploaded file: ${file.name}`,
        sender: "user",
        timestamp: new Date(),
        type: "file",
      }
      setMessages((prev) => [...prev, fileMessage])
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="relative h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="h-6 w-6 text-white" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {String(unreadCount)}
            </Badge>
          )}
        </Button>
      </div>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? "h-16" : "h-[600px]"} w-96`}
    >
      <Card className="h-full flex flex-col shadow-2xl border-blue-200">
        {/* Header */}
        <CardHeader className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage src={currentAgent.avatar || "/placeholder.svg"} alt={currentAgent.name} />
                  <AvatarFallback className="bg-blue-500 text-white">
                    {currentAgent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                    currentAgent.status === "online"
                      ? "bg-green-500"
                      : currentAgent.status === "busy"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                  }`}
                />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{currentAgent.name}</h3>
                <div className="flex items-center space-x-1">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      chatStatus === "connected"
                        ? "bg-green-400"
                        : chatStatus === "waiting"
                          ? "bg-yellow-400"
                          : "bg-gray-400"
                    }`}
                  />
                  <span className="text-xs opacity-90">
                    {chatStatus === "connected" ? "Connected" : chatStatus === "waiting" ? "Connecting..." : "Offline"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Status Bar */}
            <div className="px-4 py-2 bg-blue-50 border-b flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Headphones className="h-4 w-4 text-blue-600" />
                <span className="text-gray-700">Live Support</span>
                <Badge variant="outline" className="text-xs">
                  {currentAgent.speciality}
                </Badge>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-gray-600 text-xs">{currentAgent.rating}</span>
              </div>
            </div>

            {/* Messages */}
            <CardContent className="flex-1 p-0 overflow-hidden">
              <div className="h-full overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[80%] ${
                        message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      {message.sender !== "user" && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage
                            src={message.sender === "bot" ? "/placeholder.svg?height=32&width=32" : message.agentAvatar}
                            alt={message.sender === "bot" ? "Bot" : message.agentName}
                          />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {message.sender === "bot" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white"
                            : message.sender === "bot"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-white border border-gray-200 text-gray-800"
                        }`}
                      >
                        <p className="text-sm">{String(message.text)}</p>
                        <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={currentAgent.avatar || "/placeholder.svg"} alt={currentAgent.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="px-4 py-2 border-t bg-gray-50">
                <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickReplies.slice(0, 3).map((reply) => (
                    <Button
                      key={reply.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs h-7 px-2"
                    >
                      {reply.text}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFileUpload}
                  className="h-9 w-9 p-0 text-gray-500 hover:text-gray-700"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="h-9 w-9 p-0 bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />

              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>Powered by Emax Protocol Support</span>
                <div className="flex items-center space-x-2">
                  <Phone className="h-3 w-3" />
                  <Mail className="h-3 w-3" />
                  <Clock className="h-3 w-3" />
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
