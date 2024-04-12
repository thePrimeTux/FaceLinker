import os
import cv2
import pickle
import face_recognition

def updateEncodings():    
    saved_encodings = []
    for encoding_file in os.listdir("./static/encodings/"):
        saved_encodings.append(encoding_file)

    for image_file in os.listdir("./static/image_storage/"):
        if image_file+".pkl" not in saved_encodings:
            target_image = face_recognition.load_image_file("./static/image_storage/"+image_file)
            detected_pos = face_recognition.face_locations(target_image)

            target_encoding = []

            for face in detected_pos:
                top, right, bottom, left = face
                face_image = target_image[top:bottom, left:right]
                face_image = cv2.resize(face_image, (256, 256))
                
                face_embedding = face_recognition.face_encodings(face_image)
                target_encoding.append(face_embedding)

            target_encoding = [encoding for encoding in target_encoding if encoding]
            with open(f'./static/encodings/{image_file}.pkl', 'wb') as file:
                pickle.dump(target_encoding, file)
    
    print("Complete")
    

def deleteEncodings(filename):
    encoding_path = os.path.join("./static/encodings/", filename)
    print(encoding_path)
    for encoding_file in os.listdir("./static/encodings/"):
        if encoding_file == filename+".pkl":
            if os.path.exists(encoding_path):
                os.remove("./static/encodings/"+encoding_file)
                print(f"Deleted encoding: {encoding_file}")