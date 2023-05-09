import openai
import json

openai.api_key = ''


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
        {"role": "system", "content": "You should give me a recipe only in json format with no extra talking, here is an example:{\"recipe name\":name,  \"ingredients\":[(name,quantity,unit)], \"steps\" : [step1, step2]}"},
        {"role": "user", "content": "I have 200g beef, 50g shrimp and 100g chicken. give me a recipe using these ingredients"},
        # {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        # {"role": "user", "content": "Where was it played?"}
        ]
    )
    text = response['choices'][0]['message']['content']
    return text

if __name__ == '__main__':
    # res = getResponseFromChatGPT('test: ping')
    res = getResponseFromChatGPTChatCompletion("")
    res = res[res.find("{"):]
    print(res)
    recipe = json.loads(res)
    
    print("recipe name:",recipe["recipe name"])
    print("ingredients:",recipe["ingredients"])
    print("recipe name:",recipe["steps"])
    
    
    print(res)

