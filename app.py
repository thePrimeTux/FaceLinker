from flask import Flask, request, redirect, url_for, render_template, send_file, session
from zipfile import ZipFile
import sqlite3
import os

from detect import detectFaces
from update_encodings import deleteEncodings

app = Flask(__name__)
app.secret_key = 'PeePeePooPoo'

is_logged_in = False
output = []

@app.route('/')
def home():
    global is_logged_in
    error = session.pop('error', None)
    
    if not is_logged_in:
        return render_template('login.html', error=error)
    else:
        return render_template('index.html', error=error)


@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']
    
    connection = sqlite3.connect("user_data.db")
    cursor  =  connection.cursor()
    query =  "SELECT email FROM users WHERE email=? and password=?"
    cursor.execute(query, (email, password))
    results = cursor.fetchall()
    connection.close()
    global is_logged_in
    
    if len(results) == 1:
        is_logged_in = True
        if results[0][0] == "admin@gmail.com":
            return redirect(url_for('admin'))
    else:
        is_logged_in = False
        session['error'] = "Incorrect username or password"
        
    return redirect(url_for('home'))

@app.route('/register', methods=['POST'])
def register():
    email = request.form['email']
    password = request.form['password']
    
    connection = sqlite3.connect("user_data.db")
    cursor  =  connection.cursor()
    try:
        query =  "INSERT INTO users (email, password) VALUES (?, ?)"
        cursor.execute(query, (email, password))
        connection.commit()
        
        global is_logged_in
        is_logged_in = True
        print("noerror")
    except:
        print("error")
        session['error'] = "Email already exists"
    finally:
        connection.close()
        return redirect(url_for('home'))
    
    
@app.route('/logout', methods=['POST'])
def logout():
    global is_logged_in
    is_logged_in = False
    return redirect(url_for('home'))


@app.route('/detect', methods=['GET', 'POST'])
def detect():
    global output
    reference = request.files['reference']
    
    output = detectFaces(reference)
 
    if output == -1:
        session['error'] = "error"
        return redirect(url_for('home'))
    
    return render_template('detect.html', output_files=output)


@app.route('/zip_files')
def zip_files():
    directory_path = './static/image_storage'  
    zip_file_path = './files.zip'

    with ZipFile(zip_file_path, 'w') as zipf:
        for file_name in os.listdir(directory_path):
            if file_name in output:
                file_path = os.path.join(directory_path, file_name)
                zipf.write(file_path, file_name)

    return send_file(zip_file_path, as_attachment=True)


@app.route('/admin', methods=['GET'])
def admin():
    preview = []
    directory = "./static/image_storage"
    for file_name in os.listdir(directory):
        preview.append(file_name)
    return render_template('admin.html', preview_files=preview)


@app.route('/delete', methods=['POST'])
def delete_image():
    filename = request.form['filename']
    
    deleteEncodings(filename)
    
    directory = "./static/image_storage"
    image_path = os.path.join(directory, filename)
    
    if os.path.exists(image_path):
        os.remove(image_path)
        print(f"Deleted image: {filename}")
    else:
        print(f"Image not found: {filename}")    
    return redirect(url_for('admin'))


@app.route('/upload', methods=['POST'])
def upload_image():
    files = request.files.getlist('images')
    directory = "./static/image_storage"
    
    for file in files:
        if file and file.filename != '':
            filename = file.filename
            file.save(os.path.join(directory, filename))
            
    return redirect(url_for('admin'))
    

if __name__ == '__main__':
    app.run(debug = True)