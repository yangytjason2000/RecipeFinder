import boto3
import json

def update_item(event, context):
    try:
        payload = json.loads(event['body'])
    except Exception:
        body = json.dumps({
            'message': 'Payload not valid'
        })
        return serialize_response(400, body)
    if not 'name' in payload:
        body = json.dumps({
            'message': 'Ingredient name not provided'
        })
        return serialize_response(400, body)
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Ingredients')
    table.put_item(Item=payload)
    return serialize_response(200, '')

def serialize_response(status_code, body):
    return {
        'statusCode': status_code,
        'headers': {},
        'body': body,
        'isBase64Encoded': False
    }