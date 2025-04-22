import os
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

@api_view(['POST'])
def ask_ai(request):
    question = request.data.get('question', '')
    if not question:
        return Response({'error': 'No question provided'}, status=400)

    try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
        headers = {"Content-Type": "application/json"}
        data = {
            "contents": [{
                "parts": [{"text": question}]
            }]
        }

        response = requests.post(url, headers=headers, json=data)
        result = response.json()

        # Get the generated text
        ai_reply = result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")

        return Response({'answer': ai_reply})

    except Exception as e:
        return Response({'error': str(e)}, status=500)
