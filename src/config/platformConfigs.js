export const platformConfigs = {
    twitter: {
      name: 'X/Twitter',
      icon: '𝕏',
      fields: [
        { key: 'apiKey', label: 'API Key', type: 'password', required: true },
        { key: 'apiSecret', label: 'API Secret', type: 'password', required: true },
        { key: 'accessToken', label: 'Access Token', type: 'password', required: true },
        { key: 'accessTokenSecret', label: 'Access Token Secret', type: 'password', required: true }
      ]
    },
    telegram: {
      name: 'Telegram',
      icon: '✈️',
      fields: [
        { key: 'botToken', label: 'Bot Token', type: 'password', required: true },
        { key: 'channelId', label: 'Channel ID', type: 'text', required: true }
      ]
    },
    youtube: {
      name: 'YouTube',
      icon: '▶️',
      fields: [
        { key: 'clientId', label: 'Client ID', type: 'password', required: true },
        { key: 'clientSecret', label: 'Client Secret', type: 'password', required: true },
        { key: 'refreshToken', label: 'Refresh Token', type: 'password', required: true }
      ]
    },
    bunny: {
      name: 'Bunny Stream',
      icon: '🐰',
      fields: [
        { key: 'apiKey', label: 'API Key', type: 'password', required: true },
        { key: 'libraryId', label: 'Library ID', type: 'text', required: true }
      ]
    }
  };