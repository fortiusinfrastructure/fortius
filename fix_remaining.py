import json
from deep_translator import GoogleTranslator
import time
import os

es_file = '/Users/dasalazarr/Projects/Fortius/fortius/apps/web-escuela-hispanica/src/messages/es.json'
en_file = '/Users/dasalazarr/Projects/Fortius/fortius/apps/web-escuela-hispanica/src/messages/en.json'
pt_file = '/Users/dasalazarr/Projects/Fortius/fortius/apps/web-escuela-hispanica/src/messages/pt.json'

with open(es_file, 'r', encoding='utf-8') as f:
    es_data = json.load(f)
with open(en_file, 'r', encoding='utf-8') as f:
    en_data = json.load(f)
with open(pt_file, 'r', encoding='utf-8') as f:
    pt_data = json.load(f)

keys_to_fix = ['mora', 'nogueira', 'huerta']

def translate_chunked(text, lang):
    translator = GoogleTranslator(source='es', target=lang)
    paragraphs = text.replace('\r', '').split('\n\n')
    translated_paragraphs = []
    
    current_chunk = ""
    for p in paragraphs:
        if len(current_chunk) + len(p) < 4000:
            current_chunk += p + "\n\n"
        else:
            translated_paragraphs.append(translator.translate(current_chunk.strip()))
            current_chunk = p + "\n\n"
            time.sleep(1)
            
    if current_chunk.strip():
        translated_paragraphs.append(translator.translate(current_chunk.strip()))
        
    return '\n\n'.join(translated_paragraphs).strip()

for key in keys_to_fix:
    print(f"Fixing {key}...")
    es_text = es_data['Biografias']['authors'].get(key, {}).get('shortBio', '')
    if not es_text:
        continue
    
    en_translation = translate_chunked(es_text, 'en')
    en_data['Biografias']['authors'][key]['shortBio'] = en_translation
    print(f"Translated {key} to EN ({len(en_translation)} chars)")
    time.sleep(1)
    
    pt_translation = translate_chunked(es_text, 'pt')
    pt_data['Biografias']['authors'][key]['shortBio'] = pt_translation
    print(f"Translated {key} to PT ({len(pt_translation)} chars)")
    time.sleep(1)

with open(en_file, 'w', encoding='utf-8') as f:
    json.dump(en_data, f, indent=2, ensure_ascii=False)
with open(pt_file, 'w', encoding='utf-8') as f:
    json.dump(pt_data, f, indent=2, ensure_ascii=False)
    
print("Done!")
