"use client"

import { useState, useEffect } from 'react'
import { uploadFile, listFiles, deleteFile, getFileUrl, getCurrentUser } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, Trash2, Download, FileText, Image as ImageIcon, File } from 'lucide-react'

interface FileInfo {
  name: string
  id: string
  metadata: Record<string, any>
  created_at: string
}

/**
 * File Storage Component
 * Demonstrates Supabase Storage with upload, list, and delete operations
 */
export default function FileStorageManager() {
  const [files, setFiles] = useState<FileInfo[]>([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedBucket, setSelectedBucket] = useState<'user-documents' | 'avatars' | 'receipts'>('user-documents')

  useEffect(() => {
    loadFiles()
  }, [selectedBucket])

  const loadFiles = async () => {
    try {
      const user = await getCurrentUser()
      if (!user) {
        setLoading(false)
        return
      }

      const { data, error } = await listFiles(selectedBucket, user.id)

      if (error) {
        console.error('Error loading files:', error)
      } else if (data) {
        setFiles(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const user = await getCurrentUser()
      if (!user) {
        alert('Please login first')
        setUploading(false)
        return
      }

      // Create unique file path
      const timestamp = Date.now()
      const filePath = `${user.id}/${timestamp}_${file.name}`

      const { data, error } = await uploadFile(selectedBucket, filePath, file)

      if (error) {
        alert('Upload failed: ' + error.message)
      } else {
        alert('File uploaded successfully!')
        await loadFiles() // Refresh file list
      }
    } catch (error: any) {
      alert('Upload error: ' + error.message)
    } finally {
      setUploading(false)
      // Reset input
      e.target.value = ''
    }
  }

  const handleDelete = async (fileName: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return

    try {
      const user = await getCurrentUser()
      if (!user) return

      const filePath = `${user.id}/${fileName}`
      const { error } = await deleteFile(selectedBucket, filePath)

      if (error) {
        alert('Delete failed: ' + error.message)
      } else {
        setFiles((prev) => prev.filter((f) => f.name !== fileName))
        alert('File deleted successfully!')
      }
    } catch (error: any) {
      alert('Delete error: ' + error.message)
    }
  }

  const handleDownload = async (fileName: string) => {
    try {
      const user = await getCurrentUser()
      if (!user) return

      const filePath = `${user.id}/${fileName}`
      
      // For public buckets like avatars, we can use the public URL
      if (selectedBucket === 'avatars') {
        const url = getFileUrl(selectedBucket, filePath)
        window.open(url, '_blank')
      } else {
        // For private buckets, download the file
        const { downloadFile } = await import('@/lib/supabase')
        const { data, error } = await downloadFile(selectedBucket, filePath)

        if (error) {
          alert('Download failed: ' + error.message)
        } else if (data) {
          const url = URL.createObjectURL(data)
          const a = document.createElement('a')
          a.href = url
          a.download = fileName.split('_').slice(1).join('_') // Remove timestamp prefix
          a.click()
          URL.revokeObjectURL(url)
        }
      }
    } catch (error: any) {
      alert('Download error: ' + error.message)
    }
  }

  const getFileIcon = (metadata?: Record<string, any>) => {
    const mimetype = metadata?.mimetype
    if (!mimetype) return <File className="h-5 w-5 text-gray-500" />
    
    if (mimetype.startsWith('image/')) {
      return <ImageIcon className="h-5 w-5 text-blue-500" />
    } else if (mimetype.includes('pdf')) {
      return <FileText className="h-5 w-5 text-red-500" />
    } else {
      return <File className="h-5 w-5 text-gray-500" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  return (
    <div className="space-y-6">
      {/* Bucket Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Storage Bucket</CardTitle>
          <CardDescription>Choose which type of files to manage</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button
            variant={selectedBucket === 'user-documents' ? 'default' : 'outline'}
            onClick={() => setSelectedBucket('user-documents')}
          >
            Documents
          </Button>
          <Button
            variant={selectedBucket === 'avatars' ? 'default' : 'outline'}
            onClick={() => setSelectedBucket('avatars')}
          >
            Avatars
          </Button>
          <Button
            variant={selectedBucket === 'receipts' ? 'default' : 'outline'}
            onClick={() => setSelectedBucket('receipts')}
          >
            Receipts
          </Button>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload File</CardTitle>
          <CardDescription>
            Upload files to your {selectedBucket.replace('-', ' ')} storage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <Input
              type="file"
              onChange={handleFileUpload}
              disabled={uploading}
              accept={selectedBucket === 'avatars' ? 'image/*' : '*'}
            />
            {uploading && (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                <span className="text-sm">Uploading...</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Files List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Files ({files.length})</CardTitle>
          <CardDescription>Manage your uploaded files</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : files.length === 0 ? (
            <Alert>
              <AlertDescription>No files uploaded yet</AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {getFileIcon(file.metadata)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {file.name.split('_').slice(1).join('_') || file.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(file.metadata?.size || 0)} • {' '}
                        {new Date(file.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(file.name)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(file.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
