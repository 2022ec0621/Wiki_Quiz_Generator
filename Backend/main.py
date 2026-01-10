from fastapi import FastAPI, Depends,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, Quiz, init_db
from scraper import scrape_wikipedia
from llmquizgenerator import generate_quiz_from_text
from requests import Session
from schemas import QuizRequest,QuizHistoryResponse


import datetime

import json

app = FastAPI(title="AI Wiki Quiz Generator")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


init_db()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@app.get("/")
def health_check():
    return {"status": "Backend running"}


@app.post("/generate_quiz")
def generate_quiz(payload: QuizRequest):
    url = payload.url
    difficulty = payload.difficulty
  

    if not url:
        return {"error": "URL is required"}
    db = SessionLocal()
    existing = db.query(Quiz).filter(
        Quiz.url == url,
        Quiz.difficulty ==difficulty
    ).first()

    if existing:
        return {
            "id": existing.id,
            "title": existing.title,
            "quiz": json.loads(existing.full_quiz_data)
        }



    title, text, = scrape_wikipedia(url)
    quiz_data = generate_quiz_from_text(text,difficulty)

    if "error" in quiz_data:
        return {
            "title": title,
            "quiz": [],
            "error": quiz_data["error"]
        }
    
    new_quiz = Quiz(
        url=url,
        title=title,
        difficulty=difficulty,  
        scraped_content=text,
        full_quiz_data=json.dumps(quiz_data["quiz"]),
        date_generated=datetime.datetime.now(datetime.UTC)
    )

  

    
    db.add(new_quiz)
    db.commit()
    db.refresh(new_quiz)

    return {
        "id": new_quiz.id,
        "title": title,
        "quiz": quiz_data["quiz"]
    }


@app.get("/history", response_model=QuizHistoryResponse)
def get_quiz_history(
    difficulty: str | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(Quiz)

    if difficulty:
        query = query.filter(Quiz.difficulty == difficulty)

    quizzes = query.order_by(Quiz.date_generated.desc()).limit(20).all()

    history = [
        {
            "id": q.id,
            "title": q.title,
            "url": q.url,
            "difficulty": q.difficulty,
            "date_generated": q.date_generated
        }
        for q in quizzes
    ]

    return {"history": history}


@app.get("/history/{quiz_id}")
def get_quiz_by_id(quiz_id: int, db: Session = Depends(get_db)):
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()

    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    return {
        "id": quiz.id,
        "title": quiz.title,
        "difficulty": quiz.difficulty,
        "quiz": json.loads(quiz.full_quiz_data)
    }

@app.delete("/history/{quiz_id}")
def del_quiz_by_id( quiz_id: int,db: Session = Depends(get_db)):
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(
            status_code=404,
            detail="Quiz not found"
        )
    db.delete(quiz)
    db.commit()
    return {
        "message": "Quiz deleted successfully",
        "deleted_id": quiz_id
    }