from flask import Flask, request, redirect, url_for, render_template, send_file
from werkzeug.utils import secure_filename
from detect import detectFaces
from zipfile import ZipFile
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'

is_logged_in = False

@app.route('/')
def home():
    if not is_logged_in:
        return render_template('login.html')
    else:
        return render_template('index.html')


@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']
    if email == "james@gmail.com" and password == "123":
        global is_logged_in
        is_logged_in = True
    return redirect(url_for('home'))

@app.route('/logout', methods=['POST'])
def logout():
    global is_logged_in
    is_logged_in = False
    return redirect(url_for('home'))


@app.route('/detect', methods=['GET', 'POST'])
def detect():
    reference = request.files['reference']
    target = request.files.getlist('target')
    output = detectFaces(reference, target)
    result = []

    for file in output:
        filename = secure_filename(file.filename)
        result.append(filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.seek(0)
        file.save(filepath)

    return render_template('detect.html', output_files=result)


@app.route('/zip_files')
def zip_files():
    directory_path = './static/uploads'  
    zip_file_path = './files.zip'

    with ZipFile(zip_file_path, 'w') as zipf:
        for file_name in os.listdir(directory_path):
            file_path = os.path.join(directory_path, file_name)
            zipf.write(file_path, file_name)

    return send_file(zip_file_path, as_attachment=True)


if __name__ == '__main__':
    app.run(debug = True)