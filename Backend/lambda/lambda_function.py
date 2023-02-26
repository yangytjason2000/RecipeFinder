import boto3
import json
import re

METHODS = set(['GET', 'POST', 'DELETE'])
TABLES = set(['ingredient','recipe'])
ISO8601 = r'^([0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]{3})Z$'

def lambda_handler(event, context):

    method = event['httpMethod']
    if method not in METHODS:
        return serialize_invalid_response(f'Unsupported HTTP method: {method}')
    
    table_name = event['path'][1:]
    if table_name not in TABLES:
        return serialize_invalid_response(f'Invalid resource name: {table_name}')
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(table_name)

    if method == 'GET':
        return get_item(table)
    if method == 'POST':
        return post_item(table, event['body'])
    if method == 'DELETE':
        return delete_item(table, event['body'])

def get_item(table):
    items = []
    response = table.scan()
    items.extend(response['Items'])
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        items.extend(response['Items'])
    return serialize_correct_response(items)

def post_item(table, payload):
    valid, item = validate_payload(payload)
    if not valid:
        return serialize_invalid_response(item)

    if 'date' in item:
        date = item['date']
        match = re.fullmatch(ISO8601, date)
        if match is None:
            return serialize_invalid_response(f'Invalid date: {date}')

    table.put_item(Item=item)
    return get_item(table)

def delete_item(table, payload):
    valid, item = validate_payload(payload)
    if not valid:
        return serialize_invalid_response(item)

    table.delete_item(Key={'name': item['name']})
    return get_item(table)

def validate_payload(payload):
    try:
        payload = json.loads(payload)
    except Exception:
        return False, 'Payload not valid'
    if not 'name' in payload:
        return False, 'Ingredient name not provided'
    return True, payload

def serialize_correct_response(body=None):
    return {
        'statusCode': 200,
        'headers': {},
        'body': json.dumps(body),
        'isBase64Encoded': False
    }

def serialize_invalid_response(message):
    body = {
        'message': message
    }
    return {
        'statusCode': 400,
        'headers': {},
        'body': json.dumps(body),
        'isBase64Encoded': False
    }