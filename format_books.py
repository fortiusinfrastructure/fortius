import json
import re
import os

file_paths = [
    "apps/web-escuela-hispanica/src/messages/es.json",
    "apps/web-escuela-hispanica/src/messages/en.json",
    "apps/web-escuela-hispanica/src/messages/pt.json"
]

books = [
    "Relectiones", "De Indis", "De iure belli", "Apologética historia sumaria",
    "Manual de confesores y penitentes", "Comentario resolutorio de cambios",
    "De Iustitia et Iure", "De dominio infidelium et iusto bello",
    "Variarum Resolutionum ex Iure Pontificio, Regio et Caesareo Libri IV",
    "Controversiarum illustrium aliarumque usu frequentium libri tres",
    "Suma de tratos y contratos", "Institutionum Dialecticarum Libri Octo",
    "Comentarios a la Summa Theologiae", "Historiae de rebus Hispaniae",
    "De Rege et Regis Institutione", "De Monetae Mutatione", "De Rege",
    "Defensio Fidei Catholicae adversus Anglicanae sectae errores",
    "Defensio Fidei", "De Procuranda Indorum Salute", "Historia natural y moral de las Indias",
    "Disputationes de Controversiis Christianae Fidei", "De Laicis",
    "De potestate summi pontificis in rebus temporalibus", "Controversias",
    "Patriarcha", "Commentarii in Secundam Secundae Divi Thomae",
    "De Indiarum Iure", "Juicio interior y secreto de la monarquía para mí solo",
    "Theologia moralis fundamentalis", "Cursus Iuris Canonici Hispani et Indici",
    "Discurso sobre el fomento de la industria popular",
    "Discurso sobre la educación popular de los artesanos",
    "Historia antigua de México", "Informe sobre la Ley Agraria",
    "Carta a los españoles americanos", "Colombeia",
    "Historia de la Revolución de Nueva España", "La Aurora de Chile",
    "Código Civil de Chile", "Historia de Méjico", "Ensayo sobre el porvenir de México",
    "Ensayo sobre el catolicismo, el liberalismo y el socialismo",
    "História de Portugal", "El protestantismo comparado con el catolicismo en sus relaciones con la civilización europea",
    "Historia de los heterodoxos españoles", "Noli me tangere", "El filibusterismo",
    "El verdadero decálogo", "La revolución filipina",
    "Del sentimiento trágico de la vida", "La agonía del cristianismo",
    "La crisis del humanismo", "Defensa de la Hispanidad", "Peruanidad",
    "La crisis presente", "España invertebrada", "La rebelión de las masas",
    "Englishmen, Frenchmen, Spaniards", "España", "A Aliança Peninsular",
    "The School of Salamanca: Readings in Spanish Monetary Theory 1544–1605",
    "Ensayo histórico sobre la noción de Estado en Chile", "Derecho y sentido común",
    "Ensayos de teoría política", "The Scholastic Roots of the American Constitution",
    "El pensamiento político en la América española durante el período de la emancipación",
    "Raíces escolásticas de la emancipación de la América española",
    "Antropología del capitalismo", "La economía de mercado y la moral cristiana", "Desde la libertad",
    "Sobre la esencia del conocimiento", "Política española: pasado y futuro", "La organización financiera de las Indias",
    "Iglesia y Estado en la América española", "El crepúsculo de las ideologías", "La partitocracia",
    "Los errores del cambio", "Historia del pensamiento económico español", "Economistas españoles contemporáneos",
    "La tradición liberal y el Estado", "El mito del hombre nuevo", "Historia de las formas del Estado", "Gobierno y Estado",
    "La Iglesia clandestina", "La razón de ser hombre", "Sociedad civil y sociedad política", "Filosofía de la vida cotidiana",
    "Ideologia e Razão de Estado", "Portugal Contemporâneo", "A Direita e as Direitas", "Novos Portugueses", "Nação e Defesa",
    "O Jardim das Aflições", "O Imbecil Coletivo", "O Mínimo que você precisa saber para não ser um idiota",
    "Historia del pensamiento económico", "The Salamanca School",
    "Los poderes de la tempestad", "La Escuela de Salamanca y la renovación de la teología en el siglo XVI", 
    "Money, Bank Credit and Economic Cycles", "The Spanish Origin of International Law: Francisco de Vitoria and His Law of Nations",
    "The Catholic Conception of International Law", "Politische Theologie", "Der Nomos der Erde", "The Natural Law",
    "The Road to Serfdom", "The Constitution of Liberty", "Law, Legislation and Liberty", "The New Science of Politics",
    "Order and History", "The Ecumenic Age", "History of Economic Analysis", "We Hold These Truths",
    "La formation de la pensée juridique moderne", "Economic Thought Before Adam Smith", "Teoría de las Cortes"
]

# Sort books by length descending to avoid partial matches on shorter titles doing weird things
books.sort(key=len, reverse=True)

def process_text(text):
    if not isinstance(text, str):
        return text
    # Clean broken xa0 spaces
    text = text.replace("\xa0", " ")
    
    # We strip any existing formatting first so we don't duplicate
    for b in books:
        text = text.replace(f"*{b}*", b)
        text = text.replace(f"<i>{b}</i>", b)
        text = text.replace(f'<span className="italic">{b}</span>', b)
        
    # Then apply the correct formatting
    for b in books:
        # Match only when it's not part of another word.
        # But replacing blindly is okay if we use word boundaries, however in Spanish some characters don't match \b cleanly.
        # Simple string replacement is usually robust for these titles.
        # However, to avoid replacing "De Rege" inside "De Rege et Regis...", we already sorted by length!
        text = text.replace(b, f"*{b}*")
        
    return text

for fp in file_paths:
    with open(fp, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    for k, v in data["Biografias"]["authors"].items():
        if "shortBio" in v:
            v["shortBio"] = process_text(v["shortBio"])
        if "contribution" in v:
            v["contribution"] = process_text(v["contribution"])
            
    with open(fp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

print("Done formatting books.")
