import json
import os
import random
import string
from datetime import datetime, timedelta

def handler(event: dict, context) -> dict:
    '''API для регистрации и авторизации пользователей с SMS-кодами'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        action = body.get('action')
        
        if action == 'send_code':
            phone = body.get('phone', '')
            name = body.get('name', '')
            
            if not phone or len(phone) < 10:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Некорректный номер телефона'}),
                    'isBase64Encoded': False
                }
            
            code = ''.join(random.choices(string.digits, k=6))
            
            telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
            telegram_chat_id = os.environ.get('TELEGRAM_ADMIN_CHAT_ID', '')
            
            if telegram_token and telegram_chat_id:
                try:
                    import urllib.request
                    message = f"🔐 Код подтверждения Leviks Air\n\n👤 {name}\n📱 {phone}\n🔢 Код: {code}\n⏰ {datetime.now().strftime('%H:%M:%S')}"
                    
                    url = f"https://api.telegram.org/bot{telegram_token}/sendMessage"
                    data = json.dumps({
                        'chat_id': telegram_chat_id,
                        'text': message,
                        'parse_mode': 'HTML'
                    }).encode('utf-8')
                    
                    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
                    urllib.request.urlopen(req)
                except Exception as e:
                    print(f"Telegram send error: {e}")
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'Код отправлен',
                    'code': code,
                    'expires_at': (datetime.now() + timedelta(minutes=5)).isoformat()
                }),
                'isBase64Encoded': False
            }
        
        elif action == 'verify_code':
            phone = body.get('phone', '')
            code = body.get('code', '')
            expected_code = body.get('expected_code', '')
            
            if code == expected_code:
                user_token = ''.join(random.choices(string.ascii_letters + string.digits, k=32))
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': True,
                        'token': user_token,
                        'message': 'Регистрация успешна'
                    }),
                    'isBase64Encoded': False
                }
            else:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Неверный код'}),
                    'isBase64Encoded': False
                }
        
        else:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Unknown action'}),
                'isBase64Encoded': False
            }
            
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
