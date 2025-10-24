"""AI Client for LLM interactions"""

import os
import json
from typing import Any, Dict, List, Optional
import logging

try:
    from emergentintegrations import UniversalLLMClient
    EMERGENT_AVAILABLE = True
except ImportError:
    EMERGENT_AVAILABLE = False
    logging.warning(
        "emergentintegrations not available. AI features will be limited.")

logger = logging.getLogger(__name__)


class AIClient:
    """Unified AI client for all LLM interactions"""

    def __init__(self):
        self.api_key = os.getenv("EMERGENT_LLM_KEY")
        self.client = None

        if EMERGENT_AVAILABLE and self.api_key:
            try:
                self.client = UniversalLLMClient(
                    api_key=self.api_key,
                    model="gpt-4o"
                )
                logger.info("AI Client initialized successfully")
            except Exception as e:
                logger.error(f"Failed to initialize AI client: {e}")

    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        model: str = "gpt-4o",
        temperature: float = 0.7,
        response_format: Optional[Dict[str, str]] = None,
        max_tokens: Optional[int] = None
    ) -> Dict[str, Any]:
        """Get chat completion from LLM"""

        if not self.client:
            logger.warning("AI client not available, returning mock response")
            return self._mock_response(messages)

        try:
            kwargs = {
                "model": model,
                "messages": messages,
                "temperature": temperature
            }

            if response_format:
                kwargs["response_format"] = response_format
            if max_tokens:
                kwargs["max_tokens"] = max_tokens

            response = await self.client.chat.completions.create(**kwargs)

            return {
                "content": response.choices[0].message.content,
                "model": response.model,
                "usage": {
                    "prompt_tokens": response.usage.prompt_tokens,
                    "completion_tokens": response.usage.completion_tokens,
                    "total_tokens": response.usage.total_tokens
                }
            }
        except Exception as e:
            logger.error(f"AI chat completion error: {e}")
            return self._mock_response(messages)

    def _mock_response(self, messages: List[Dict[str, str]]) -> Dict[str, Any]:
        """Mock response when AI is not available"""
        return {
            "content": json.dumps({
                "error": "AI not available",
                "fallback": True,
                "karma_change": 0,
                "trait_changes": {},
                "message": "AI service unavailable. Using default logic."
            }),
            "model": "fallback",
            "usage": {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
        }

    def is_available(self) -> bool:
        """Check if AI client is available"""
        return self.client is not None


# Global AI client instance
ai_client = AIClient()
