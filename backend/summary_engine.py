import os
from openai import AsyncOpenAI
from typing import Optional

class SummaryEngine:
    """AI-powered document summarization engine"""
    
    def __init__(self):
        self.client = None
        self.api_key = os.getenv("OPENAI_API_KEY")
        
        if self.api_key:
            self.client = AsyncOpenAI(api_key=self.api_key)
    
    async def generate_summary(self, text: str) -> Optional[str]:
        """
        Generate a concise summary of the document
        
        Args:
            text: Document text to summarize
            
        Returns:
            Summary text, or None if OpenAI is not configured
        """
        if not self.client:
            return "⚠️ OpenAI API key not configured. Summary generation requires OPENAI_API_KEY environment variable."
        
        if not text or len(text.strip()) < 50:
            return "Document is too short to summarize."
        
        try:
            text_preview = text[:4000]
            
            response = await self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a legal document analyst. Provide clear, concise summaries of legal documents focusing on key terms, obligations, parties involved, and the document's purpose. Keep summaries under 200 words."
                    },
                    {
                        "role": "user",
                        "content": f"Please provide a comprehensive summary of this legal document:\n\n{text_preview}"
                    }
                ],
                temperature=0.3,
                max_tokens=300
            )
            
            summary = response.choices[0].message.content
            return summary.strip()
        
        except Exception as e:
            print(f"Error generating summary: {e}")
            return f"Unable to generate summary: {str(e)}"
