from pydantic import BaseModel,Field
from typing import Literal,List, Optional
from datetime import datetime


class QuizRequest(BaseModel):
    url: str
    difficulty: Literal["easy", "medium", "hard"]
  

class QuizHistoryItem(BaseModel):
    id: int
    title: str
    url: str
    difficulty: str
    date_generated: datetime

class QuizHistoryResponse(BaseModel):
    history: List[QuizHistoryItem]      