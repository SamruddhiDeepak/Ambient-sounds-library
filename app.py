from flask import Flask, jsonify, request
from flask_cors import CORS  # Import Flask-CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Freesound API configuration
API_BASE_URL = "https://freesound.org/apiv2/"
API_KEY = "Z4OPBc3q3t3Oy6wKnBO47OcRvlkpKGzzqpS0rEzl"  

@app.route('/api/music', methods=['GET'])
def fetch_music():
    category = request.args.get('category', 'calm music')  # Default category
    url = f"{API_BASE_URL}search/text/"
    params = {
        "query": category,
        "fields": "id,name,previews",
        "page_size": 10,
        "token": API_KEY
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        sounds = [
            {
                "id": sound["id"],
                "title": sound["name"],
                "preview_url": sound["previews"]["preview-hq-mp3"]
            }
            for sound in data.get("results", [])
        ]
        return jsonify(sounds)
    else:
        return jsonify({"error": "Failed to fetch data from Freesound API"}), response.status_code


if __name__ == '__main__':
    app.run(debug=True)
