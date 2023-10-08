from flask import Flask
from litellm import completion
from flask import request
from pydantic import BaseModel
from typing import List
from flask_pydantic import validate

OLLAMA_ENDPOINT="http://localhost:11434"

class AnswerModel(BaseModel):
    text: str
    isCorrect: bool

class FunctionParameters(BaseModel):
    questionTitle: str
    answers: List[AnswerModel]
    reason: str

class FunctionModel(BaseModel):
    name: str
    description: str
    parameters: FunctionParameters

class UserModel(BaseModel):
    role: str
    content: str

class JsonRequest(BaseModel):
    model: str
    n: int
    functions: List[FunctionModel]
    function_call: dict
    messages: List[UserModel]

app = Flask(__name__)

@app.route("/")
def index():
    return "<p>llmproxy service is running</p>"

@app.route("/healthz")
def healthz():
    return "<p>llmproxy service is Healthy</p>"

@app.route("/openai/deployments/ollama/chat/completions", methods=["POST"])
def ollama():
    print(request.json)

#     req =

#     print(req)

#     {'model': 'gpt-3.5-turbo', 'n': 1, 'functions': [{'name': 'print', 'description': 'ALWAYS respond by calling this function with the given parameters', 'parameters': {'type': 'object', 'properties': {'questionTitle': {'type': 'string', 'description': 'question title'}, 'answers': {'type': 'array', 'items': {'type': 'object', 'properties': {'text': {'type': 'string', 'minLength': 1, 'maxLength': 32, 'description': 'answer text'}, 'isCorrect': {'type': 'boolean', 'description': 'is this answer correct?'}}, 'required': ['text', 'isCorrect'], 'additionalProperties': False}, 'minItems': 4, 'maxItems': 4, 'description': '4 possible answers'}, 'reason': {'type': 'string', 'description': 'Why the correct answer is correct'}}, 'required': ['questionTitle', 'answers', 'reason'], 'additionalProperties': False}}], 'function_call': {'name': 'print'}, 'messages': [{'role': 'user', 'content': '\n      You are a teacher in a secondary school in singapore.\n      You are creating a mock O Level quiz for your students.\n      You want to create multiple choice questions for your students to answer.\n      There are only 4 options, A, B, C, D. Only 1 of them is correct.\n      Keep the scope of the question to the topic of "chemistry in Singapore O Levels.\n      Give a reason as to why the option is correct.\n      '}]}


#     print(req)

    response = completion(
        model="ollama/llama2",
#         messages=[{ "content": "respond in 5 words. who are you?","role": "user"}], # make this dynamic
        messages=request.json["messages"],
        api_base=OLLAMA_ENDPOINT,

    )
    print(response)
    return response

if __name__ == "__main__":
    app.run(debug=True, port=5044)
