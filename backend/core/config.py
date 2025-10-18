from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # App
    APP_NAME: str = "Karma Nexus 2.0"
    DEBUG: bool = True
    VERSION: str = "1.0.0"
    
    # Database
    MONGO_URL: str = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    DB_NAME: str = os.environ.get('DB_NAME', 'karma_nexus')
    
    # Security
    SECRET_KEY: str = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # CORS
    CORS_ORIGINS: List[str] = os.environ.get('CORS_ORIGINS', '*').split(',')
    
    # AI
    EMERGENT_LLM_KEY: str = os.environ.get('EMERGENT_LLM_KEY', '')
    
    # Game Constants
    MAX_TRAITS: int = 80
    MAX_SUPERPOWERS: int = 25
    STARTING_CREDITS: int = 1000
    STARTING_KARMA: int = 0
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
