# Samsung One UI Calculator (with Unit & Smart Currency Converter)

A pixel-perfect, 1:1 recreation of the Samsung Calculator (One UI 6.1) built with **React 19**, **TypeScript**, and **Tailwind CSS**, featuring full multi-category unit conversions and a smart live currency converter with offline rate persistence.

[![Download Android APK](https://img.shields.io/badge/Download_APK-SmartCalc.apk-27ae60?style=for-the-badge&logo=android&logoColor=white)](https://github.com/anumpaudel06-cmd/SmartCalc/releases/latest/download/SmartCalc.apk)
[![GitHub Release](https://img.shields.io/github/v/release/anumpaudel06-cmd/SmartCalc?style=for-the-badge&color=blue)](https://github.com/anumpaudel06-cmd/SmartCalc/releases)

---

## 📱 Download & Install Android APK
You can install SmartCalc directly on your Android phone:
1. Go to [**Releases**](https://github.com/anumpaudel06-cmd/SmartCalc/releases) or click [**Download SmartCalc.apk**](https://github.com/anumpaudel06-cmd/SmartCalc/releases/latest/download/SmartCalc.apk).
2. Open the downloaded `.apk` file on your Android device.
3. Allow "Install from unknown sources" if prompted, then tap **Install**.

---

## 🌟 Key Features

### 1. Authentic Samsung One UI Experience
- **1:1 Visual Clone**: Exact One UI typography, round buttons in a 4×5 grid, signature emerald green operators (`+`, `-`, `×`, `÷`) and equals (`=`), and coral orange/red Clear (`C`) button.
- **Top Equation & Live Preview**: Real-time result preview updates dynamically as you type expressions before pressing `=`.
- **Samsung Utility Bar**: 4 quick-access utility icons for Calculation History, Unit Converter (Ruler), Smart Currency Converter, and Backspace (tap to delete, hold to clear).
- **Haptic & Sound Feedback**: Tactile vibration response (`navigator.vibrate`) and authentic acoustic key click synthesizer powered by Web Audio API.
- **Copy to Clipboard**: Long-press on any equation or result to copy with instant toast confirmation.
- **Galaxy Frame Toggle**: Switch between an authentic Samsung Galaxy S24 device chassis (status bar, punch-hole camera, gesture pill) and edge-to-edge view.

### 2. Full Multi-Category Unit Converter
Supports 8 complete unit categories with global standard measurements:
- 📏 **Length**: km, m, cm, mm, µm, nm, mile, yard, foot, inch, nautical mile
- 📐 **Area**: sq km, sq m, sq cm, sq mm, hectare, acre, sq mile, sq yard, sq foot, sq inch
- ⚖️ **Mass**: metric ton, kg, g, mg, µg, pound (lb), ounce (oz), stone, US ton, imperial ton
- 🌡️ **Temperature**: Celsius (°C), Fahrenheit (°F), Kelvin (K)
- 🧪 **Volume**: cubic meter, liter, milliliter, US gallon, quart, pint, cup, fluid ounce, cubic foot, cubic inch
- 💾 **Data**: Bit, Byte, KB, MB, GB, TB, PB
- 🏎️ **Speed**: m/s, km/h, mph, knot, ft/s
- ⏱️ **Time**: nanoseconds, microseconds, milliseconds, seconds, minutes, hours, days, weeks, months, years
- Includes built-in numeric keypad and dynamic conversion ratio indicators (e.g., `1 km = 1,000 m`).

### 3. Smart Currency Converter (Main Feature)
- **Global Currencies**: 50+ major world currencies with flags, ISO codes, and country names (e.g., NPR-Nepal, INR-India, USD-USA, EUR-Eurozone, GBP-UK, AUD-Australia, MYR-Malaysia, etc.).
- **Smart Update Logic**:
  - Automatically fetches live rates when the device reconnects to the internet (`online` listener).
  - Automatically fetches fresh rates whenever the Currency Converter tab is opened.
  - Automatically schedules an update at **12:00 AM (00:00 local time)** every single day.
  - Bandwidth-efficient lightweight API integration.
  - **Offline Resilience**: Automatically stores rates in `localStorage` and displays an offline status badge with exact last-saved date & time stamp.
  - Quick currency swap button (`⇄`) with smooth transition.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn or bun

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/samsung-oneui-calculator.git
   cd samsung-oneui-calculator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Audio & Haptics**: Web Audio API & Vibration API
- **Live Rates**: Open Exchange Rates API (free, lightweight)

---

## 📄 License

MIT License. Designed and created for educational and personal utility purposes.
