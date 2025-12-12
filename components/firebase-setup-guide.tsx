"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ExternalLink, AlertTriangle, CheckCircle, Copy } from "lucide-react"
import { getMissingEnvVars } from "@/lib/firebase"
import { useState } from "react"

export function FirebaseSetupGuide() {
  const [copiedVar, setCopiedVar] = useState<string | null>(null)
  const missingVars = getMissingEnvVars()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedVar(text)
    setTimeout(() => setCopiedVar(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Firebase Setup Required</CardTitle>
          <CardDescription>Firebase authentication is not configured. Follow these steps to set it up.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Missing Environment Variables:</strong>
              <ul className="mt-2 list-disc list-inside">
                {missingVars.map((varName) => (
                  <li key={varName} className="font-mono text-sm">
                    {varName}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <h3 className="font-semibold">Create a Firebase Project</h3>
            </div>
            <p className="text-sm text-gray-600 ml-8">
              Go to the Firebase Console and create a new project or select an existing one.
            </p>
            <Button
              variant="outline"
              className="ml-8 bg-transparent"
              onClick={() => window.open("https://console.firebase.google.com", "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Firebase Console
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <h3 className="font-semibold">Enable Authentication</h3>
            </div>
            <p className="text-sm text-gray-600 ml-8">
              In your Firebase project, go to Authentication → Sign-in method and enable Email/Password provider.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <h3 className="font-semibold">Get Your Firebase Config</h3>
            </div>
            <p className="text-sm text-gray-600 ml-8">
              Go to Project Settings → General → Your apps → Web app → Config
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <h3 className="font-semibold">Add Environment Variables</h3>
            </div>
            <p className="text-sm text-gray-600 ml-8">Add these environment variables to your project:</p>
            <div className="ml-8 space-y-2">
              {missingVars.map((varName) => (
                <div key={varName} className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
                  <code className="flex-1 text-sm font-mono">{varName}=your_value_here</code>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(varName)} className="h-6 w-6 p-0">
                    {copiedVar === varName ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Once you've added the environment variables, refresh this page and the authentication forms will work
              normally.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
