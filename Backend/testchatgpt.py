import openai
import json
import os

from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")


def getResponseFromChatGPTTextCompletion(prompt):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.6,
    )
    text = response.choices[0].text.strip()
    return text

#write a function that take a string as argument and send to chatgpt



def getResponseFromChatGPTChatCompletion(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
          messages=[
        {"role": "system", "content": "You should give me a recipe only in json format with no extra talking. Here is an example:{\"recipe name\":name,  \"ingredients\":[(name,quantity,unit)], \"steps\" : [step1, step2]}"},
        {"role": "user", "content": "I have 200g beef, 50g shrimp and 100g chicken, 5000g noodle, 500g dumpling. give me a recipe for one serving using some of these ingredients. You don't have to use up each ingredient"},
        # {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        # {"role": "user", "content": "Where was it played?"}
        ]
    )
    text = response['choices'][0]['message']['content']
    return text

if __name__ == '__main__':
    # print(openai.api_key)
    res = getResponseFromChatGPTChatCompletion("")
    print(res)
    res = res[res.find("{"):res.rfind("}")+1]
    if(res.find("{") == -1 or res.rfind("}")+1 == -1 or len(res)==0):
        print("cannot provide a recipe")
        exit()
    recipe = json.loads(res)
    
    print("recipe name:",recipe["recipe name"])
    print("ingredients:",recipe["ingredients"])
    print("recipe name:",recipe["steps"])
    
    


