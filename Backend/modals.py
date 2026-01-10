from sqlalchemy import Column,Integer,Boolean,String,Text
from database import Base
from datetime import datetime

class Quiz(Base):
    __tablename__ = "quizzes"
    id = Column(Integer, primary_key=True, index=True)
    url = Column(String,nullable=False)
    title = Column(String)
    date_generated = Column(datetime, default=datetime.datetime.utcnow)
    scraped_content = Column(Text)
    full_quiz_data = Column(Text)