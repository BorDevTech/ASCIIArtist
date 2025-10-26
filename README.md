# ASCIIArtist

A modern web application for generating high-quality ASCII art from images, built with Next.js 15 and Chakra UI v3.

## Features

- 🎨 **Multiple Canvas Sizes**: Choose from Small (60) to XX-Large (150) character widths
- 🌈 **Character Set Options**: Toggle between Simple and Detailed character sets for varying levels of detail
- 🖼️ **Image Input Options**: 
  - Enter image URLs from the web
  - Upload image files from your device
  - Use built-in demo image
- 📸 **Image Preview**: See your image before generating ASCII art
- ⚡ **Real-time Generation**: Instant high-quality ASCII art generation
- 🎯 **Advanced Algorithm**: Brightness-based pixel-to-ASCII mapping for realistic results
- 📱 **Responsive Design**: Clean, modern UI that adapts to different screen sizes

## How It Works

ASCIIArtist converts images into ASCII art by:
1. Loading your image (from URL or file upload)
2. Analyzing each pixel's brightness
3. Mapping brightness values to ASCII characters (darker pixels = denser characters)
4. Generating detailed ASCII art that resembles the original image

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

### Deploy to GitHub Pages

This project includes a GitHub Actions workflow that automatically deploys the application to GitHub Pages when you push to the `main` branch.

To enable GitHub Pages deployment:

1. Go to your repository's **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Push your code to the `main` branch
4. The workflow will automatically build and deploy your site

The site will be available at: `https://<username>.github.io/<repository-name>/`

You can also manually trigger the deployment from the **Actions** tab.

## Usage

1. **Load an Image**:
   - Enter an image URL in the text field, OR
   - Click "Choose File" to upload an image from your device, OR
   - Click "Load Demo Image" to try a built-in example
2. **Adjust Settings**:
   - **Canvas Size**: Select the width of your ASCII art (larger = more detail but takes more space)
   - **Character Set**: Choose "Simple" for basic characters or "Detailed" for 70+ character variety
3. **Generate**: Click the "Generate ASCII Art" button
4. **View Result**: Your ASCII art appears in the canvas section below

## Example Results

The application can generate highly detailed ASCII art from photographs, creating effects similar to:
- Hyper-realistic butterfly ASCII art with detailed wing patterns
- Portrait ASCII art with recognizable facial features
- Landscape ASCII art with depth and shading

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