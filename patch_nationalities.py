import json

updates = {
    "veracruz": {"es": "Virreinato de Nueva España", "en": "Viceroyalty of New Spain", "pt": "Vice-Reino da Nova Espanha"},
    "mercado": {"es": "España / Virreinato de Nueva España", "en": "Spain / Viceroyalty of New Spain", "pt": "Espanha / Vice-Reino da Nova Espanha"},
    "anchieta": {"es": "España / Estado del Brasil", "en": "Spain / State of Brazil", "pt": "Espanha / Estado do Brasil"},
    "acosta": {"es": "España / Virreinato del Perú", "en": "Spain / Viceroyalty of Peru", "pt": "Espanha / Vice-Reino do Peru"},
    "belarmino": {"es": "Estados Pontificios", "en": "Papal States", "pt": "Estados Pontifícios"},
    "solorzano": {"es": "España / Virreinato del Perú", "en": "Spain / Viceroyalty of Peru", "pt": "Espanha / Vice-Reino do Peru"},
    "palafox": {"es": "España / Virreinato de Nueva España", "en": "Spain / Viceroyalty of New Spain", "pt": "Espanha / Vice-Reino da Nova Espanha"},
    "velarde": {"es": "España / Capitanía General de Filipinas", "en": "Spain / Captaincy General of the Philippines", "pt": "Espanha / Capitania-Geral das Filipinas"},
    "clavijero": {"es": "Virreinato de Nueva España", "en": "Viceroyalty of New Spain", "pt": "Vice-Reino da Nova Espanha"},
    "viscardo": {"es": "Virreinato del Perú", "en": "Viceroyalty of Peru", "pt": "Vice-Reino do Peru"},
    "miranda": {"es": "Capitanía General de Venezuela", "en": "Captaincy General of Venezuela", "pt": "Capitania-Geral da Venezuela"},
    "talamantes": {"es": "Virreinato del Perú / Virreinato de Nueva España", "en": "Viceroyalty of Peru / Viceroyalty of New Spain", "pt": "Vice-Reino do Peru / Vice-Reino da Nova Espanha"},
    "mier": {"es": "Virreinato de Nueva España / México", "en": "Viceroyalty of New Spain / Mexico", "pt": "Vice-Reino da Nova Espanha / México"},
    "henriquez": {"es": "Capitanía General de Chile / Chile", "en": "Captaincy General of Chile / Chile", "pt": "Capitania-Geral do Chile / Chile"},
    "bello": {"es": "Capitanía General de Venezuela / Chile", "en": "Captaincy General of Venezuela / Chile", "pt": "Capitania-Geral da Venezuela / Chile"},
    "alaman": {"es": "Virreinato de Nueva España / México", "en": "Viceroyalty of New Spain / Mexico", "pt": "Vice-Reino da Nova Espanha / México"},
    "estrada": {"es": "México", "en": "Mexico", "pt": "México"},
    "herrera": {"es": "Perú", "en": "Peru", "pt": "Peru"},
    "rizal": {"es": "Capitanía General de Filipinas", "en": "Captaincy General of the Philippines", "pt": "Capitania-Geral das Filipinas"},
    "mabini": {"es": "Capitanía General de Filipinas / Filipinas", "en": "Captaincy General of the Philippines / Philippines", "pt": "Capitania-Geral das Filipinas / Filipinas"},
    "belaunde": {"es": "Perú", "en": "Peru", "pt": "Peru"},
    "meinvielle": {"es": "Argentina", "en": "Argentina", "pt": "Argentina"},
    "eyzaguirre": {"es": "Chile", "en": "Chile", "pt": "Chile"},
    "grice": {"es": "Reino Unido", "en": "United Kingdom", "pt": "Reino Unido"},
    "gongora": {"es": "Chile", "en": "Chile", "pt": "Chile"},
    "stoetzer": {"es": "Argentina", "en": "Argentina", "pt": "Argentina"},
    "gonzalez": {"es": "México", "en": "Mexico", "pt": "México"},
    "sacheri": {"es": "Argentina", "en": "Argentina", "pt": "Argentina"},
    "bravo": {"es": "Chile", "en": "Chile", "pt": "Chile"},
    "ochaa": {"es": "Guinea Española / Guinea Ecuatorial", "en": "Spanish Guinea / Equatorial Guinea", "pt": "Guiné Espanhola / Guiné Equatorial"},
    "ndongo": {"es": "Guinea Ecuatorial", "en": "Equatorial Guinea", "pt": "Guiné Equatorial"},
}

langs = {
    "es": "apps/web-escuela-hispanica/src/messages/es.json",
    "en": "apps/web-escuela-hispanica/src/messages/en.json",
    "pt": "apps/web-escuela-hispanica/src/messages/pt.json",
}

for lang, fp in langs.items():
    with open(fp, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    for k, v in data["Biografias"]["authors"].items():
        if k in updates and lang in updates[k]:
            v["nationality"] = updates[k][lang]
            
    with open(fp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
        
print("Successfully patched nationalities.")
