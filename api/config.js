export const config = {
  name: "Nexus Free API",
  author: "@NexusDev",

  categories: {
    ai: {
      name: "AI",
      desc: "Artificial Intelligence APIs",
      endpoints: [
        {
          method: "GET",
          path: "/ai/chatgpt",
          name: "ChatGPT",
          desc: "Chat with GPT-3.5",
          params: [{name:"text",required:true,desc:"Your message"}]
        },
        {
          method: "GET",
          path: "/ai/gemini",
          name: "Gemini",
          desc: "Google Gemini AI",
          params: [{name:"text",required:true,desc:"Your message"}]
        },
        {
          method: "GET",
          path: "/ai/copilot",
          name: "Copilot",
          desc: "Microsoft Copilot AI chat",
          params: [{name:"text",required:true,desc:"Your message"}]
        }
      ]
    },

    downloader: {
      name: "Downloader",
      desc: "Download videos and media",
      endpoints: [
        {
          method: "GET",
          path: "/downloader/tiktok",
          name: "TikTok Downloader",
          desc: "Download TikTok video without watermark",
          params: [{name:"url",required:true,desc:"TikTok URL"}]
        }
      ]
    },

    tools: {
      name: "Tools",
      desc: "Utility and helper APIs",
      endpoints: [
        {
          method: "GET",
          path: "/tools/qr",
          name: "QR Generator",
          desc: "Generate QR code from text",
          params: [{name:"text",required:true,desc:"Text for QR"}]
        }
      ]
    }
  }
}
