# Camp Along 🏕️

**Find campsites along your route!**

🌐 **[Live Site: camp-along.vercel.app](https://camp-along.vercel.app)**

Camp Along is a modern web application that helps travelers discover campsites along their planned routes. Whether you're planning a cross-country road trip or a weekend camping adventure, Camp Along makes it easy to find the perfect spots to set up camp.

![Camp Along Interface](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js) ![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)

## 🌟 Features

### 🗺️ Interactive Route Planning
- **Smart Route Calculation**: Input source and destination addresses to calculate optimal driving routes
- **Real-time Geocoding**: Automatic address resolution using advanced geocoding services
- **Visual Route Display**: See your planned route overlaid on an interactive map

### 🏕️ Campsite Discovery
- **Comprehensive Database**: Access to thousands of campsites from OpenCampingMap.org
- **Proximity Search**: Find campsites within a customizable distance from your route (1-100 miles)
- **Smart Filtering**: Campsites are intelligently filtered based on your route and search preferences

### 📍 Detailed Campsite Information
- **Rich Facility Data**: Comprehensive information about campsite amenities and facilities
- **Visual Icons**: Intuitive icons showing available facilities (toilets, showers, power, WiFi, etc.)
- **Capacity Information**: Details about tent sites, RV spots, and maximum occupancy
- **Star Ratings**: Quality ratings where available
- **Reservation Requirements**: Clear indication of advance booking needs

### 🎯 Advanced Features
- **Interactive Map**: Full-featured Leaflet-based mapping with OpenStreetMap tiles
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Smooth user experience with loading indicators
- **Error Handling**: Robust error handling for network issues and invalid inputs

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TrentFisher6/camp-along.git
   cd camp-along
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Modern, accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful, consistent icons

### Mapping & Geolocation
- **Leaflet** - Open-source interactive maps
- **React Leaflet** - React components for Leaflet maps
- **OpenStreetMap** - Collaborative mapping data
- **Turf.js** - Advanced geospatial analysis

### State Management
- **Zustand** - Lightweight state management
- **React Hooks** - Built-in state management

### Data Sources
- **OpenCampingMap.org** - Comprehensive campsite database
- **OpenRouteService** - Route calculation and directions
- **Custom geocoding API** - Address resolution services

## 📱 Usage Guide

### Planning Your Route
1. **Enter Addresses**: Input your starting point and destination in the sidebar
2. **Find Campsites**: Click "Find Campsites" to calculate your route and discover nearby campsites
3. **Adjust Search Distance**: Use the slider to customize how far from your route to search (1-100 miles)

### Exploring Campsites
- **Map Markers**: Different colored markers indicate campsite types (standard, private, nudist, group-only, backcountry)
- **Click for Details**: Click any campsite marker to view detailed information
- **Facility Icons**: Quickly identify available amenities through visual icons
- **Capacity Information**: See how many tents, RVs, or people the site can accommodate

### Campsite Categories
- **🔵 Standard**: Regular public campsites
- **⚫ Private**: Private or membership-only sites
- **🟣 Nudist**: Clothing-optional campsites
- **🟤 Group Only**: Sites reserved for large groups
- **🟢 Backcountry**: Primitive camping sites

## 🏗️ Project Structure

```
camp-along/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind config
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   │   ├── button.tsx    # Button component
│   │   ├── card.tsx      # Card component
│   │   ├── facilities.tsx # Campsite facilities data
│   │   ├── facility-icons.tsx # Facility icon renderer
│   │   ├── route-input.tsx # Route input form
│   │   ├── search-distance-slider.tsx # Distance slider
│   │   ├── sidebar.tsx   # Sidebar components
│   │   ├── site-information.tsx # Campsite info popup
│   │   └── ...           # Other UI components
│   ├── app-sidebar.tsx   # Main application sidebar
│   └── OpenStreetMap.js  # Map component
├── hooks/                # Custom React hooks
│   └── use-mobile.ts     # Mobile device detection
├── lib/                  # Utility functions
│   └── utils.ts          # General utilities
├── public/               # Static assets
│   ├── cicons/          # Campsite facility icons
│   ├── markers/         # Map marker icons
│   └── other-icons/     # Miscellaneous icons
├── store/               # State management
│   └── useStore.ts      # Zustand store
└── ...                  # Configuration files
```

## 🎨 Design Features

### Modern UI/UX
- **Clean Interface**: Minimalist design focusing on functionality
- **Responsive Layout**: Adapts to all screen sizes
- **Accessible Components**: Built with accessibility in mind
- **Smooth Animations**: Tailwind CSS animations for better UX

### Interactive Elements
- **Collapsible Sidebar**: Expandable/collapsible navigation
- **Dynamic Loading States**: Visual feedback during data fetching
- **Hover Effects**: Interactive feedback on all clickable elements
- **Toast Notifications**: User feedback for actions and errors

## 🌐 API Integration

### Geocoding Service
- Custom AWS Lambda endpoint for address resolution
- Handles location search and coordinate conversion
- Error handling for invalid addresses

### Route Calculation
- OpenRouteService integration for optimal route planning
- Polyline decoding for route visualization
- Distance and duration calculations

### Campsite Data
- OpenCampingMap.org API integration
- Bounding box queries for efficient data retrieval
- Real-time campsite information

## 📊 Performance Features

### Optimization Techniques
- **Dynamic Imports**: Code splitting for better performance
- **Server-Side Rendering**: Next.js SSR for faster initial loads
- **Image Optimization**: Automatic image optimization
- **Caching**: Efficient data caching strategies

### Map Performance
- **Marker Clustering**: Efficient rendering of multiple campsites
- **Lazy Loading**: Components loaded only when needed
- **Distance Calculations**: Optimized algorithms for proximity search

## 🤝 Contributing

We welcome contributions to Camp Along! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

### Data Providers
- **[OpenCampingMap.org](https://opencampingmap.org)** - Comprehensive campsite database and facility icons
- **[OpenStreetMap](https://openstreetmap.org)** - Collaborative mapping data and tiles
- **[OpenRouteService](https://openrouteservice.org)** - Route calculation and directions API

### Technology Partners
- **[Vercel](https://vercel.com)** - Deployment and hosting platform
- **[Next.js](https://nextjs.org)** - React framework
- **[Tailwind CSS](https://tailwindcss.com)** - CSS framework

## 🐛 Bug Reports & Feature Requests

Found a bug or have an idea for improvement? Please:

1. Check existing issues first
2. Create a detailed issue report
3. Include steps to reproduce (for bugs)
4. Provide screenshots if applicable

## 📞 Support

- **GitHub Issues**: [Create an issue](https://github.com/TrentFisher6/camp-along/issues)
- **Documentation**: Check this README and code comments
- **Community**: Join discussions in the repository

---

**Happy Camping! 🏕️** 

Made with ❤️ for outdoor enthusiasts and road trip adventurers.