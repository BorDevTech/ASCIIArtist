'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { useState } from 'react'

// Simple ASCII art generator function
function generateAsciiArt(text: string, width: number, isColor: boolean): string {
  if (!text.trim()) {
    return ''
  }

  // ASCII characters from darkest to lightest
  const asciiChars = isColor
    ? ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.', ' ']
    : ['@', '#', '%', '*', '+', '=', '-', ':', '.', ' ']

  const lines: string[] = []
  const words = text.split(/\s+/)
  let currentLine = ''

  // Simple text wrapping
  for (const word of words) {
    if ((currentLine + word).length > width) {
      if (currentLine) {
        lines.push(currentLine.trim())
        currentLine = word + ' '
      } else {
        lines.push(word.slice(0, width))
        currentLine = word.slice(width) + ' '
      }
    } else {
      currentLine += word + ' '
    }
  }
  if (currentLine) {
    lines.push(currentLine.trim())
  }

  // Convert text to ASCII art with a border
  const maxLineLength = Math.min(width, Math.max(...lines.map(l => l.length)))
  const border = asciiChars[0].repeat(maxLineLength + 4)
  
  const artLines = [border]
  for (const line of lines) {
    const paddedLine = line.padEnd(maxLineLength, ' ')
    artLines.push(`${asciiChars[0]} ${paddedLine} ${asciiChars[0]}`)
  }
  artLines.push(border)

  return artLines.join('\n')
}

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [asciiArt, setAsciiArt] = useState('')
  const [canvasSize, setCanvasSize] = useState('60')
  const [colorMode, setColorMode] = useState('bw')

  const handleGenerate = () => {
    const width = parseInt(canvasSize)
    const isColor = colorMode === 'color'
    const art = generateAsciiArt(inputText, width, isColor)
    setAsciiArt(art)
  }

  return (
    <Box h="100vh" display="flex" flexDirection="column">
      <Container maxW="container.xl" py={4} flex="0 0 auto">
        <Stack gap={4} align="stretch">
          <Heading size="lg" textAlign="center">
            ASCII Artist
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
                <option value="40">Small (40)</option>
                <option value="60">Medium (60)</option>
                <option value="80">Large (80)</option>
                <option value="100">X-Large (100)</option>
              </select>
            </Box>

            <Box>
              <Heading size="sm" mb={2}>
                Color Mode
              </Heading>
              <Stack direction="row" gap={4}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="radio"
                    value="bw"
                    checked={colorMode === 'bw'}
                    onChange={(e) => setColorMode(e.target.value)}
                  />
                  B&W
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="radio"
                    value="color"
                    checked={colorMode === 'color'}
                    onChange={(e) => setColorMode(e.target.value)}
                  />
                  Color
                </label>
              </Stack>
            </Box>
          </Flex>

          {/* Input Section */}
          <Flex gap={2}>
            <Textarea
              placeholder="Enter text to convert to ASCII art..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              resize="vertical"
              minH="100px"
              flex="1"
            />
            <Button
              colorScheme="blue"
              onClick={handleGenerate}
              alignSelf="flex-start"
              size="lg"
              px={8}
            >
              Generate
            </Button>
          </Flex>
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
            fontSize="sm"
            whiteSpace="pre"
          >
            {asciiArt || 'Your ASCII art will appear here...'}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
