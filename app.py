from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)
app.static_folder = 'static'

API_KEY = '18a40f631ad8526afc3ce99ab0a78e1d'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather')
def get_weather_data():
    city = request.args.get('city')
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
