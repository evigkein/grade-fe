export function sendMessageToTelegram (token: string, channelId: string, message: string): string {
  return `https://api.telegram.org/bot${token}/sendMessage?chat_id=${channelId}&text=${message}`
}
