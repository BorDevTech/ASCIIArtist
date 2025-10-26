# ASCIIArtist

A modern web application for generating ASCII art from text, built with Next.js 15 and Chakra UI v3.

## Features

- 🎨 **Canvas Size Selection**: Choose from multiple canvas widths (40, 60, 80, 100 characters)
- 🌈 **Color Mode**: Toggle between B&W and Color ASCII character sets
- ✍️ **Text Input**: Easy-to-use textarea for entering text to convert
- 🖼️ **Real-time Generation**: Instant ASCII art generation with the click of a button
- 📱 **Responsive Design**: Clean, modern UI that adapts to different screen sizes

## Screenshots

### Initial UI
![Initial UI](https://github.com/user-attachments/assets/0985e971-a612-49a6-a0bc-fd4fae41a28e)

### Generated ASCII Art (Medium 60, B&W)
![Generated ASCII Art - Medium B&W](https://github.com/user-attachments/assets/c47edb83-9360-4239-9cb5-141c289dc8cc)

### Generated ASCII Art (Large 80, Color)
![Generated ASCII Art - Large Color](https://github.com/user-attachments/assets/a891c8bf-bea1-4757-98ed-6ad328756cc8)

## Tech Stack

- **Next.js 15.5.6** - React framework with App Router
- **React 19 RC** - UI library
- **Chakra UI v3.28.0** - Component library
- **TypeScript** - Type safety
- **Emotion** - CSS-in-JS styling

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BorDevTech/ASCIIArtist.git
cd ASCIIArtist
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. **Select Canvas Size**: Choose your desired width from the dropdown (Small, Medium, Large, or X-Large)
2. **Choose Color Mode**: Select between B&W or Color for different ASCII character sets
3. **Enter Text**: Type or paste your text into the textarea
4. **Generate**: Click the "Generate" button to create your ASCII art
5. **View Result**: Your ASCII art appears in the canvas section below

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
ASCIIArtist/
├── app/
│   ├── layout.tsx       # Root layout with Chakra UI provider
│   ├── page.tsx         # Main page with ASCII art generator
│   └── providers.tsx    # Chakra UI provider configuration
├── .eslintrc.json       # ESLint configuration
├── .gitignore          # Git ignore rules
├── next.config.js      # Next.js configuration
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.