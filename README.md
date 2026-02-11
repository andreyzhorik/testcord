# Notcord - Professional Multi-Channel Chat

Notcord is a high-performance chat client built with React, featuring a professional dark-mode UI, real-time presence, and specialized channels for media and code.

## 🚀 Features

- **Multi-Channel Architecture**: 
    - `#general`: Standard sanitized text chat.
    - `#photos`: High-resolution media cards for URLs and "uploads".
    - `#code`: VS Code-style snippet viewer with highlighting and copy-to-clipboard.
- **Smart Presence Engine**: 
    - Heartbeat system updates every 10s.
    - Automatic "Offline" status after 30s of inactivity.
    - Real-time online sidebar.
- **Advanced UI Mechanics**:
    - **Smart-Scroll**: Only snaps to bottom if you are already looking at current messages.
    - **Gold @Mentions**: Visual highlighting when your name is mentioned.
    - **Live Theme Engine**: Change primary colors and sidebar styles instantly.
    - **Background Notifications**: Desktop alerts for mentions and new posts.
- **Persistence**: User profiles and theme settings are maintained across refreshes.

## 🛠️ Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)

## 📦 Installation

1. Clone or download the repository content.
2. Open your terminal in the project root directory.
3. Install dependencies:
    `npm install`
4. Start the application:
    `npm start`

## ⚙️ Configuration

The application is pre-configured to point to four public MockAPI endpoints:
- **General Chat**: `.../chat`
- **Photos Channel**: `.../photos`
- **Code Channel**: `.../code`
- **Presence Engine**: `.../players`

No environment variables are required for initial setup.

## 🖥️ Usage

- **Identity**: Click the Settings (gear) icon in the bottom-left sidebar to change your username or avatar.
- **Photos**: In the #photos channel, pasting a link will automatically render it as a card. Clicking the "+" button allows you to "upload" by providing a URL.
- **Code**: In the #code channel, messages are formatted as blocks. Start your message with the language (e.g., `javascript const x = 5`) for highlighting.
- **Themes**: Use the color pickers in Settings to change the look of the app in real-time.

## 📁 Project Structure

- `src/api`: Endpoint definitions.
- `src/context`: Auth (Identity) and Theme state management.
- `src/hooks`: Heartbeat and lifecycle logic.
- `src/components/chat`: UI for messages, photo cards, and code snippets.
- `src/components/layout`: Sidebar, Header, and structural components.

## ❓ Troubleshooting

- **Messages not appearing**: The API has a limit of 100 objects. If it's full, you might need to clear the MockAPI datasets or wait.
- **Notifications not working**: Ensure you have granted permission in the browser's address bar settings.
- **Offline users**: If a user hasn't sent a pulse in 30 seconds, they will be removed from the sidebar automatically.
