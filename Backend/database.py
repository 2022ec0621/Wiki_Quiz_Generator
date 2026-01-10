from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv;
import os;
import datetime

load_dotenv()
DATABASE_URL= os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Quiz(Base):
    __tablename__ = "quizzes"
    id = Column(Integer, primary_key=True, index=True)
    url = Column(String)
    title = Column(String)
    difficulty = Column(String, nullable=False)  
    date_generated = Column(DateTime, default=datetime.datetime.utcnow)
    scraped_content = Column(Text)
    full_quiz_data = Column(Text)

def init_db():
    Base.metadata.create_all(bind=engine)

