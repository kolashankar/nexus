"""Base AI Service for all AI agents"""

import os
from abc import ABC, abstractmethod
from typing import Any, Dict
import logging

logger = logging.getLogger(__name__)


class BaseAIService(ABC):
    """Base class for all AI services in the Pantheon"""

    def __init__(self, name: str, model: str = "gpt-4o"):
        self.name = name
        self.model = model
        self.api_key = os.getenv("EMERGENT_LLM_KEY")

        if not self.api_key:
            logger.warning(f"{name}: No EMERGENT_LLM_KEY found in environment")

    @abstractmethod
    async def process(self, *args, **kwargs) -> Dict[str, Any]:
        """Process the AI request - must be implemented by subclasses"""
        pass

    def is_available(self) -> bool:
        """Check if AI service is available"""
        return self.api_key is not None

    async def fallback_response(self, *args, **kwargs) -> Dict[str, Any]:
        """Fallback response when AI is not available"""
        return {
            "error": f"{self.name} is not available",
            "fallback": True,
            "message": "AI service unavailable. Using default logic."
        }
