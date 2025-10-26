'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useState, useRef } from 'react'

// Advanced image-to-ASCII converter
async function imageToAscii(
  imageSource: string | File,
  width: number,
  isColor: boolean
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'

    // ASCII characters from darkest to lightest (more detailed set)
    const asciiChars = isColor
      ? ['$', '@', 'B', '%', '8', '&', 'W', 'M', '#', '*', 'o', 'a', 'h', 'k', 'b', 'd', 'p', 'q', 'w', 'm', 'Z', 'O', '0', 'Q', 'L', 'C', 'J', 'U', 'Y', 'X', 'z', 'c', 'v', 'u', 'n', 'x', 'r', 'j', 'f', 't', '/', '\\', '|', '(', ')', '1', '{', '}', '[', ']', '?', '-', '_', '+', '~', '<', '>', 'i', '!', 'l', 'I', ';', ':', ',', '"', '^', '`', "'", '.', ' ']
      : ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.', ' ']

    img.onload = () => {
      // Create canvas for image processing
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Could not get canvas context'))
        return
      }

      // Calculate dimensions maintaining aspect ratio
      const aspectRatio = img.height / img.width
      const targetWidth = width
      const targetHeight = Math.floor(targetWidth * aspectRatio * 0.5) // 0.5 compensates for character height/width ratio

      canvas.width = targetWidth
      canvas.height = targetHeight

      // Draw image to canvas
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

      // Get pixel data
      const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight)
      const pixels = imageData.data

      // Convert pixels to ASCII
      let ascii = ''
      for (let y = 0; y < targetHeight; y++) {
        for (let x = 0; x < targetWidth; x++) {
          const offset = (y * targetWidth + x) * 4
          const r = pixels[offset]
          const g = pixels[offset + 1]
          const b = pixels[offset + 2]

          // Calculate brightness (weighted average)
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255

          // Map brightness to ASCII character
          const charIndex = Math.floor((1 - brightness) * (asciiChars.length - 1))
          ascii += asciiChars[charIndex]
        }
        ascii += '\n'
      }

      resolve(ascii)
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    // Handle different image sources
    if (typeof imageSource === 'string') {
      img.src = imageSource
    } else {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          img.src = e.target.result as string
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(imageSource)
    }
  })
}

export default function Home() {
  const [imageUrl, setImageUrl] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [asciiArt, setAsciiArt] = useState('')
  const [canvasSize, setCanvasSize] = useState('100')
  const [colorMode, setColorMode] = useState('color')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleGenerate = async () => {
    setError('')
    setIsGenerating(true)

    try {
      const width = parseInt(canvasSize)
      const isColor = colorMode === 'color'

      let art = ''
      if (imageFile) {
        art = await imageToAscii(imageFile, width, isColor)
      } else if (imageUrl.trim()) {
        art = await imageToAscii(imageUrl, width, isColor)
      } else {
        setError('Please provide an image URL or upload an image file')
        setIsGenerating(false)
        return
      }

      setAsciiArt(art)
    } catch (err) {
      setError('Failed to generate ASCII art. Please check your image source.')
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImageUrl('') // Clear URL when file is selected
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewUrl(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setImageUrl(url)
    if (url.trim()) {
      setImageFile(null) // Clear file when URL is entered
      setPreviewUrl(url)
    } else {
      setPreviewUrl('')
    }
  }

  const loadDemoImage = () => {
    // Create a simple demo image using canvas
    const canvas = document.createElement('canvas')
    const CANVAS_WIDTH = 300
    const CANVAS_HEIGHT = 200
    const CENTER_X = CANVAS_WIDTH / 2
    const CENTER_Y = CANVAS_HEIGHT / 2
    const FACE_RADIUS = 60
    const EYE_RADIUS = 8
    const SMILE_RADIUS = 30
    
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT
    const ctx = canvas.getContext('2d')
    
    if (ctx) {
      // Create a gradient background
      const gradient = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      gradient.addColorStop(0, '#1a1a1a')
      gradient.addColorStop(0.5, '#4a4a4a')
      gradient.addColorStop(1, '#8a8a8a')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      
      // Draw a circle (simple face)
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(CENTER_X, CENTER_Y, FACE_RADIUS, 0, Math.PI * 2)
      ctx.fill()
      
      // Draw eyes
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(CENTER_X - 20, CENTER_Y - 10, EYE_RADIUS, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(CENTER_X + 20, CENTER_Y - 10, EYE_RADIUS, 0, Math.PI * 2)
      ctx.fill()
      
      // Draw smile
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(CENTER_X, CENTER_Y, SMILE_RADIUS, 0, Math.PI)
      ctx.stroke()
      
      // Convert to data URL and set
      const dataUrl = canvas.toDataURL('image/png')
      setImageUrl(dataUrl)
      setImageFile(null)
      setPreviewUrl(dataUrl)
    }
  }

  return (
    <Box h="100vh" display="flex" flexDirection="column">
      <Container maxW="container.xl" py={4} flex="0 0 auto">
        <Stack gap={4} align="stretch">
          <Heading size="lg" textAlign="center">
            ASCII Artist - Image to ASCII Converter
          </Heading>

          {/* Controls Section */}
          <Flex gap={4} wrap="wrap" align="center">
            <Box>
              <Heading size="sm" mb={2}>
                Canvas Size
              </Heading>
              <select
                value={canvasSize}
                onChange={(e) => setCanvasSize(e.target.value)}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  width: '150px',
                }}
              >
                <option value="60">Small (60)</option>
                <option value="80">Medium (80)</option>
                <option value="100">Large (100)</option>
                <option value="120">X-Large (120)</option>
                <option value="150">XX-Large (150)</option>
              </select>
            </Box>

            <Box>
              <Heading size="sm" mb={2}>
                Character Set
              </Heading>
              <Stack direction="row" gap={4}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="radio"
                    value="bw"
                    checked={colorMode === 'bw'}
                    onChange={(e) => setColorMode(e.target.value)}
                  />
                  Simple
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="radio"
                    value="color"
                    checked={colorMode === 'color'}
                    onChange={(e) => setColorMode(e.target.value)}
                  />
                  Detailed
                </label>
              </Stack>
            </Box>
          </Flex>

          {/* Image Input Section */}
          <Stack gap={3}>
            <Flex justify="space-between" align="center">
              <Heading size="sm">Image Source</Heading>
              <Button
                size="sm"
                variant="outline"
                colorScheme="teal"
                onClick={loadDemoImage}
              >
                Load Demo Image
              </Button>
            </Flex>
            
            <Box>
              <Text fontSize="sm" mb={2}>Image URL:</Text>
              <Input
                placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                value={imageUrl}
                onChange={handleUrlChange}
                size="md"
              />
            </Box>

            <Flex align="center" gap={2}>
              <Box w="100%" h="1px" bg="gray.300" />
              <Text fontSize="sm" color="gray.500">OR</Text>
              <Box w="100%" h="1px" bg="gray.300" />
            </Flex>

            <Box>
              <Text fontSize="sm" mb={2}>Upload Image:</Text>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  width: '100%',
                }}
              />
            </Box>

            {/* Image Preview */}
            {previewUrl && (
              <Box>
                <Text fontSize="sm" mb={2}>Preview:</Text>
                <Box
                  borderRadius="md"
                  border="1px solid"
                  borderColor="gray.200"
                  overflow="hidden"
                  maxW="300px"
                >
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </Box>
              </Box>
            )}

            {error && (
              <Box
                p={3}
                bg="red.50"
                borderRadius="md"
                border="1px solid"
                borderColor="red.200"
              >
                <Text color="red.700" fontSize="sm">{error}</Text>
              </Box>
            )}

            <Button
              colorScheme="blue"
              onClick={handleGenerate}
              loading={isGenerating}
              loadingText="Generating..."
              size="lg"
              w="100%"
            >
              Generate ASCII Art
            </Button>
          </Stack>
        </Stack>
      </Container>

      {/* Canvas Section - consumes rest of page */}
      <Box
        flex="1"
        bg="gray.50"
        overflow="auto"
        borderTop="2px solid"
        borderColor="gray.200"
      >
        <Container maxW="container.xl" py={4} h="100%">
          <Box
            bg="white"
            p={4}
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
            h="100%"
            overflow="auto"
            fontFamily="monospace"
            fontSize="xs"
            whiteSpace="pre"
            lineHeight="1.0"
          >
            {asciiArt || 'Your ASCII art will appear here...\n\nTip: Try these example images:\n- Butterfly: https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800\n- Portrait: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800\n- Landscape: https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
