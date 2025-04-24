import os
import traceback
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

@api_view(['POST'])
def explain_mode(request):
    return run_gemini_prompt(request, mode='explain')

@api_view(['POST'])
def feedback_mode(request):
    return run_gemini_prompt(request, mode='feedback')

def run_gemini_prompt(request, mode):
    text = request.data.get('question', '')

    if not text:
        return Response({'error': 'No question provided'}, status=400)

    prompt_text = (
    f"Give feedback in 1 or 2 simple sentences. Only use small, clear words. Do not mention the person's age. Imagine you're just replying kindly and briefly to a work message, ackowdge what they did rigth and how they can improve: \"{text}\""
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
        return Response({'answer': ai_reply})

    except Exception as e:
        return Response({'error': str(e)}, status=500)
