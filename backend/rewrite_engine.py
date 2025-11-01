import os
from typing import List, Optional, Dict
from openai import AsyncOpenAI

class RewriteEngine:
    """OpenAI-powered clause rewriting engine"""
    
    def __init__(self):
        self.client = None
        self.api_key = os.getenv("OPENAI_API_KEY")
        
        # Lazy initialization - only create client when needed
        if self.api_key:
            self.client = AsyncOpenAI(api_key=self.api_key)
    
    async def rewrite_clauses(self, clauses: List[str]) -> Optional[List[str]]:
        """
        Rewrite risky clauses to be safer and more balanced
        
        Args:
            clauses: List of risky clause texts to rewrite
            
        Returns:
            List of rewritten clauses, or None if OpenAI is not configured
        """
        if not self.client:
            return None
        
        if not clauses:
            return []
        
        try:
            # Batch process multiple clauses in a single API call to minimize costs
            prompt = self._build_rewrite_prompt(clauses)
            
            response = await self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a legal expert helping to rewrite contract clauses to be more balanced and fair to both parties. Provide clear, concise alternatives that protect both sides."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.7,
                max_tokens=1500
            )
            
            # Parse the response
            rewritten_text = response.choices[0].message.content
            rewrites = self._parse_rewrites(rewritten_text, len(clauses))
            
            return rewrites
        
        except Exception as e:
            print(f"Error rewriting clauses: {e}")
            return None
    
    def _build_rewrite_prompt(self, clauses: List[str]) -> str:
        """Build prompt for batch rewriting"""
        prompt = "Please rewrite the following contract clauses to be more balanced and fair. "
        prompt += "For each clause, provide a safer alternative that protects both parties.\n\n"
        
        for i, clause in enumerate(clauses, 1):
            prompt += f"CLAUSE {i}:\n{clause}\n\n"
        
        prompt += "Provide rewrites in this format:\n"
        prompt += "REWRITE 1: [your rewrite]\n"
        prompt += "REWRITE 2: [your rewrite]\n"
        prompt += "etc."
        
        return prompt
    
    def _parse_rewrites(self, response_text: str, expected_count: int) -> List[str]:
        """Parse the AI response into individual rewrites"""
        rewrites = []
        
        # Split by "REWRITE X:" pattern
        import re
        parts = re.split(r'REWRITE \d+:', response_text)
        
        # Skip the first part (before first REWRITE marker)
        for part in parts[1:]:
            rewrite = part.strip()
            if rewrite:
                rewrites.append(rewrite)
        
        # If parsing failed, return the whole response as a single rewrite
        if len(rewrites) == 0 and response_text.strip():
            rewrites.append(response_text.strip())
        
        # Ensure we have the right number of rewrites (pad with empty if needed)
        while len(rewrites) < expected_count:
            rewrites.append("Unable to generate rewrite for this clause.")
        
        return rewrites[:expected_count]
