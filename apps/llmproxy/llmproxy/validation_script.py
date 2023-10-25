import requests
import openai
openai.api_key = "" #For now put key in here
openai.Model.list()

prompt =[
       {
          "role": "user",
          "content": "give me a question on kinematics."
       },
       {
          "role": "system",
          "content": "You are a teacher in a secondary school in singapore. You are creating a mock O Level quiz for your students. You want to create multiple choice questions for your students to answer. There are only 4 answer options. Only 1 of them is correct.Keep the scope of the question to the topic of physics in Singapore O Levels. Give a reason as to why the option is correct.Respond only in json format."
       }
      ]

"""
GPT portion
"""

# #TODO: fix why messages argument is invalid. we are using "text-davinci-003" as model. the python function is the correct endpoint
# response = openai.Completion.create(
#   engine="text-davinci-003",
# #   prompt="What dinosaurs lived in the cretaceous period?",
#   messages=prompt,
# )

# print(response.choices[0].message)

"""
Ollama portion
"""
data = {'messages': prompt}
response = requests.post('http://localhost:5044/openai/deployments/ollama/chat/completions', json=data)

if response.status_code == 200:
    result = response.json()
    print(result['choices'][0]['message'])
else:
    print('Error:', response.status_code)

"""
Test portion:
For n=0 to n=99, 
    format prompts to both LLMs.  #this part not too sure.
    make api call to both LLMS and get back response.
    parse response and output into CSV rows
"""

