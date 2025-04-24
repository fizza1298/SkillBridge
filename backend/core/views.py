import os
import traceback
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
@api_view(['POST'])
def ask_ai(request):
    text = request.data.get('question', '')
    mode = request.data.get('mode', 'explain')  # default is "explain"

    if not text:
        return Response({'error': 'No question provided'}, status=400)

    try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
        headers = {"Content-Type": "application/json"}

        if mode == "feedback":
            prompt_text = f"You're a communication coach. Give clear, positive, constructive feedback on the following customer service message: \"{text}\""
        else:
            prompt_text = f"Explain this simply to someone with a learning disability , clear and simple with emojis and no markdown: {text}"

        data = {
            "contents": [{
                "parts": [{
                    "text": prompt_text
                }]
            }]
        }

        response = requests.post(url, headers=headers, json=data)
        result = response.json()
        ai_reply = result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")

        return Response({'answer': ai_reply})

    except Exception as e:
        return Response({'error': str(e)}, status=500)

# # @api_view(['POST'])
# # def ask_ai(request):
# #     question = request.data.get('question', '')
# #     if not question:
# #         return Response({'error': 'No question provided'}, status=400)
# #     try:
# #         url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
# #         headers = {"Content-Type": "application/json"}
# #         data = {
# #                 "contents": [{
# #                     "parts": [{
# #                         "text": f"Explain this simply like I'm five: {question}"
# #                     }]
# #                 }]
# #             }


# #         response = requests.post(url, headers=headers, json=data)
# #         result = response.json()
# #         ai_reply = result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")

# #         return Response({'answer': ai_reply})
# #     except Exception as e:
# #         return Response({'error': str(e)}, status=500)
# @api_view(['POST'])
# def ask_ai(request):
#     text = request.data.get('question', '')
#     mode = request.data.get('mode', 'explain')

#     if not text:
#         return Response({'error': 'No question provided'}, status=400)

#     try:
#         url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
#         headers = {"Content-Type": "application/json"}

#         # Change prompt depending on mode
#         if mode == "feedback":
#             prompt_text = f"Give constructive feedback on this response in a friendly tone as if helping someone improve their customer service skills: \"{text}\""
#         else:
#             prompt_text = f"Explain this simply like I'm five: {text}"

#         data = {
#             "contents": [{
#                 "parts": [{
#                     "text": prompt_text
#                 }]
#             }]
#         }

#         response = requests.post(url, headers=headers, json=data)
#         result = response.json()
#         ai_reply = result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")

#         return Response({'answer': ai_reply})

#     except Exception as e:
#         return Response({'error': str(e)}, status=500)
