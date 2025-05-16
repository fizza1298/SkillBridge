import os
import traceback
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from dotenv import load_dotenv
from .models import QuizResult
import re

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

@api_view(['POST'])
def explain_mode(request):
    return run_gemini_prompt(request, mode='explain')

@api_view(['POST'])
def feedback_mode(request):
    return run_gemini_prompt(request, mode='feedback')

@api_view(["GET", "POST"])
def quiz_result(request, quiz_key):
    user_id = request.headers.get("X-User-Id") or request.data.get("user_id")
    if request.method == "POST":
        answers = request.data.get("answers", [])
        if not isinstance(answers, list):
            return Response({"error": "Answers must be a list"}, status=400)
        obj, _ = QuizResult.objects.update_or_create(
            user_id=user_id, quiz_key=quiz_key,
            defaults={"answers": answers}
        )
        return Response({"status": "saved"})
    else:  # GET
        try:
            obj = QuizResult.objects.get(user_id=user_id, quiz_key=quiz_key)
            return Response({"answers": obj.answers})
        except QuizResult.DoesNotExist:
            return Response({"answers": [None, None, None]})

def run_gemini_prompt(request, mode):
    text = request.data.get('question', '')

    if not text:
        return Response({'error': 'No question provided'}, status=400)

    prompt_text = (
    f"Give feedback to me on my communication and how i can be more freinldy. Only use small, clear words. Do not mention the person's age. Imagine you're just replying kindly ackowdge what they did rigth and how they can improve theyre communication. if they only said yes tell them to say yes i can i'd love to help you: \"{text}\""
    if mode == 'feedback'
    else f"Explain this clearly using one or two short sentences. No big words. Do not mention the person or their age. Just make it clear and simple like you're helping someone who finds things hard to read: \"{text}\""
)




    try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
        headers = {"Content-Type": "application/json"}
        data = {
            "contents": [{"parts": [{"text": prompt_text}]}]
        }

        response = requests.post(url, headers=headers, json=data)
        result = response.json()
        ai_reply = result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
        clean_reply = strip_markdown(ai_reply)
        return Response({'answer': clean_reply})

    except Exception as e:
        return Response({'error': str(e)}, status=500)

def strip_markdown(text):
    # Remove **bold**, *italics*, `code`, bullet points, etc.
    return re.sub(r'[*_`>#-]', '', text)
