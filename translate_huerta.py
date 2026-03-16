import json
from deep_translator import GoogleTranslator
import time
import sys

es_file = '/Users/dasalazarr/Projects/Fortius/fortius/apps/web-escuela-hispanica/src/messages/es.json'
en_file = '/Users/dasalazarr/Projects/Fortius/fortius/apps/web-escuela-hispanica/src/messages/en.json'
pt_file = '/Users/dasalazarr/Projects/Fortius/fortius/apps/web-escuela-hispanica/src/messages/pt.json'

with open(es_file, 'r', encoding='utf-8') as f:
    es_data = json.load(f)
with open(en_file, 'r', encoding='utf-8') as f:
    en_data = json.load(f)
with open(pt_file, 'r', encoding='utf-8') as f:
    pt_data = json.load(f)

def smart_chunk_translate(text, lang):
    translator = GoogleTranslator(source='es', target=lang)
    lines = text.replace('\r', '').split('\n')
    translated_lines = []
    
    current_chunk = ""
    for line in lines:
        if len(current_chunk) + len(line) < 4000:
            current_chunk += line + "\n"
        else:
            if current_chunk.strip():
                print(f"  -> translating chunk of size {len(current_chunk)}")
                translated_lines.append(translator.translate(current_chunk.strip()))
                time.sleep(1)
            current_chunk = line + "\n"
            
    if current_chunk.strip():
        print(f"  -> translating final chunk of size {len(current_chunk)}")
        translated_lines.append(translator.translate(current_chunk.strip()))
        
    return '\n'.join(translated_lines).strip()

key = 'huerta'
es_text = es_data['Biografias']['authors'].get(key, {}).get('shortBio', '')

if es_text:
    print(f"Translating {key} to EN ({len(es_text)} chars)...")
    en_translation = smart_chunk_translate(es_text, 'en')
    en_data['Biografias']['authors'][key]['shortBio'] = en_translation
    
    print(f"Translating {key} to PT ({len(es_text)} chars)...")
    pt_translation = smart_chunk_translate(es_text, 'pt')
    pt_data['Biografias']['authors'][key]['shortBio'] = pt_translation

with open(en_file, 'w', encoding='utf-8') as f:
    json.dump(en_data, f, indent=2, ensure_ascii=False)
with open(pt_file, 'w', encoding='utf-8') as f:
    json.dump(pt_data, f, indent=2, ensure_ascii=False)

print("Done translations for huerta!")
