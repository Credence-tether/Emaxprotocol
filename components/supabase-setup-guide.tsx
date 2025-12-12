"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, ExternalLink, AlertCircle } from "lucide-react"
import { getMissingEnvVars } from "@/lib/supabase"
import { useState } from "react"

export function SupabaseSetupGuide() {
  const [copiedVar, setCopiedVar] = useState<string | null>(null)
  const missingVars = getMissingEnvVars()

  const copyToClipboard = (text: string, varName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedVar(varName)
    setTimeout(() => setCopiedVar(null), 2000)
  }

  const envVarTemplate = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-2xl">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-8 w-8 text-orange-500" />
              <CardTitle className="text-3xl">Supabase Setup Required</CardTitle>
            </div>
            <CardDescription className="text-lg">
              To use authentication and database features, you need to configure Supabase environment variables.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="default" className="bg-blue-50 border-blue-200">
              <AlertDescription className="text-blue-900">
                Missing environment variables: <strong>{missingVars.join(", ")}</strong>
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Setup Steps:</h3>
              
              <div className="space-y-4 text-sm">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-semibold mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-xs">
                      1
                    </span>
                    Create a Supabase Project
                  </div>
                  <p className="ml-8 text-gray-600 mb-2">
                    Go to{" "}
                    <a
                      href="https://supabase.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                    >
                      supabase.com
                      <ExternalLink className="h-3 w-3" />
                    </a>{" "}
                    and create a new project.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-semibold mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-xs">
                      2
                    </span>
                    Get Your Project Credentials
                  </div>
                  <p className="ml-8 text-gray-600 mb-2">
                    In your Supabase dashboard, go to <strong>Settings → API</strong> and copy:
                  </p>
                  <ul className="ml-8 space-y-1 text-gray-600 list-disc list-inside">
                    <li>Project URL</li>
                    <li>Anon/Public Key</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-semibold mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-xs">
                      3
                    </span>
                    Create .env.local File
                  </div>
                  <p className="ml-8 text-gray-600 mb-3">
                    In your project root, create a <code className="bg-gray-200 px-2 py-1 rounded">.env.local</code>{" "}
                    file with the following content:
                  </p>
                  <div className="ml-8 relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
                      {envVarTemplate}
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(envVarTemplate, "template")}
                    >
                      {copiedVar === "template" ? "Copied!" : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-semibold mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-xs">
                      4
                    </span>
                    Restart Your Development Server
                  </div>
                  <p className="ml-8 text-gray-600 mb-2">Run:</p>
                  <code className="ml-8 bg-gray-900 text-gray-100 px-3 py-2 rounded block w-fit">npm run dev</code>
                </div>
              </div>
            </div>

            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-900">
                <strong>💡 Tip:</strong> After setup, you'll have access to authentication and database features with
                real-time updates!
              </AlertDescription>
            </Alert>

            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-2">Need help?</h4>
              <div className="space-y-2 text-sm">
                <a
                  href="https://supabase.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  Supabase Documentation
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href="https://supabase.com/docs/guides/getting-started/quickstarts/nextjs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  Next.js Integration Guide
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
