from flask import Flask, render_template, request


app = Flask(__name__)

@app.route('/')
def choose():
    return render_template('first_page.html')

@app.route('/', methods = ['POST'])
def start_game():
    x = request.form["x"]
    y = request.form["y"]
    if x == "" or y == "":
        return render_template('first_page.html')
    else:
        return render_template('game.html', x=x, y=y )

if __name__ == '__main__':
    app.run(debug=True,
            port = 5000)